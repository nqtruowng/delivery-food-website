import axios from 'axios'
import React, { useEffect, useState } from 'react'

import './Menu.scss'
import FoodCard from '../../components/FoodCard/FoodCard'

const Menu = () => {
    const [foods, setFoods] = useState([])
    useEffect(() => {
        (async () => {
            const foods = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/food/list`
            )
            if (foods.data.success === true) {
                setFoods(foods.data.data)
            }
        })()
    }, [])

    return (
        <>
            <h1>Menu</h1>
            <div className="menu_wrapper">
                {foods.map((food) => {
                    return <FoodCard food={food} key={food._id} />
                })}
            </div>
        </>
    )
}

export default Menu
