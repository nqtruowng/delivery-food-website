import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'

import './Menu.scss'
import FoodCard from '../../components/FoodCard/FoodCard'

function debounce(func, delay) {
    let timer
    return function (...args) {
      clearTimeout(timer) // Xóa bộ hẹn giờ trước đó
      timer = setTimeout(() => func(...args), delay); // Tạo bộ hẹn giờ mới
    }
}

const Menu = () => {
    const [foods, setFoods] = useState([])
    const [value, setValue] = useState()
    const [foodsWithCondition, setFoodsWithCondition] = useState([])
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

    const handleSearch = async(input) => {
        const foods = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/food/listfood/${input}`
        )
        if (foods.data.success === true) {
            setFoodsWithCondition(foods.data.data)
        }
    }

    const debouncedSearch = useCallback(debounce(handleSearch, 500), [])

    const handelOnChange = (e) => {
        const input = e.target.value
        setValue(input)
        debouncedSearch(input)
    }    

    return (
        <>
            <h1>Menu</h1>
            <form className="formField">
                <input required type="text" value={value} onChange={handelOnChange} />
                <span>Search for food</span>
            </form>
            <div className="menu_wrapper">
                {foodsWithCondition.length !== 0 ? foodsWithCondition.map((food) => {
                    return <FoodCard food={food} key={food._id} />
                }) : foods.map((food) => {
                    return <FoodCard food={food} key={food._id} />
                })}
            </div>
        </>
    )
}

export default Menu
