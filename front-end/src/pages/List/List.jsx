import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoneRounded, DeleteForeverRounded } from '@mui/icons-material'

import './List.scss'

const List = () => {
    const [list, setList] = useState([])

    const fetchListFood = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/list`)
        if (res.data.success) {
            setList(res.data.data)
        } else {
            toast.error('Loading error')
        }
    }

    useEffect(() => {
        fetchListFood()
    }, [])
    
    const removeFood = async (foodId) => {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/food/remove/${foodId}`)
        await fetchListFood()
    }

    return (
        <div className="list add flex_col">
            <p>Food Lists</p>
            <div className="list_table">
                <div className="list_table_format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Update</b>
                    <b>Delete</b>
                </div>
                {list && list.map((item, index) => {
                    return <div key={index} className="list_table_format">
                        <img src={`${import.meta.env.VITE_API_URL}/images/` + item.image} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <div>
                            <b>$</b>
                            <input type='Number' name='price' value={item.price} />
                        </div>
                        <DoneRounded className='cursor' />
                        <DeleteForeverRounded className='cursor' onClick={() => removeFood(item._id)} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default List
