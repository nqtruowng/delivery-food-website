import React from 'react'

import './FoodCard.scss'

const FoodCard = ({ food }) => {

    console.log(food);
    
  return (
    <div className="card">
      <div className="card_component">
          <img src={`${import.meta.env.VITE_API_URL}/images/${food.image}`} alt="image" />
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <button AfterText="Buy Now">
            <span>Buy Now</span>
          </button>
      </div>
    </div>
  )
}

export default FoodCard
