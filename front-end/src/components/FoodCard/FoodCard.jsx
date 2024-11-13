import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import './FoodCard.scss'
import { cartItem } from '../../GlobalState'
import { toast } from 'react-toastify'

const FoodCard = ({ food }) => {
    const setCartItem = useSetRecoilState(cartItem)
    const items = useRecoilValue(cartItem)
    const handleOnClickAddToCart = (food) => {
        const isExit = items.find((item) => item._id === food._id)
        if (isExit) {
            const newItems = items.map((item) => {
                if (item._id === food._id)  {
                    return {...item, amount: item.amount + 1}
                }
                return item
            })
            setCartItem(newItems)
        } else {
            setCartItem([...items, {
                _id: food._id,
                name: food.name,
                price: food.price,
                image: food.image,
                category: food.category,
                amount: 1,
                }]
            )
        }
        toast.success(`${food.name}`)
    }

    return (
        <div className="card">
            <div className="card_component">
                <img
                    src={`${import.meta.env.VITE_API_URL}/images/${food.image}`}
                    alt="image"
                />
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <span>{food.price}$</span>
                <button
                    onClick={() => handleOnClickAddToCart(food)}
                    aftertext="Buy Now"
                >
                    <span>Buy Now</span>
                </button>
            </div>
        </div>
    )
}

export default FoodCard
