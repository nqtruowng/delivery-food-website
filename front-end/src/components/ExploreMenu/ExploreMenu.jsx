import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './ExploreMenu.scss'
import { menu_list } from '../../assets/assets'
import FoodCard from '../FoodCard/FoodCard'

const ExploreMenu = () => {
    const [category, setCategory] = useState('All')
    const [foods, setFoods] = useState([])
    const [foodSelected, setFoodSelected] = useState()
    const Appetizer = foods.filter(item => item.category === 'Appetizer').slice(0, 5)
    const Salad = foods.filter(item => item.category === 'Salad').slice(0, 5)
    const Pizza = foods.filter(item => item.category === 'Pizza').slice(0, 5)
    const Pasta = foods.filter(item => item.category === 'Pasta').slice(0, 5)
    const Dessert = foods.filter(item => item.category === 'Desserts').slice(0, 5)
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

  useEffect(() => {
    switch (category) {
      case 'Appetizer':
        setFoodSelected(Appetizer)
        break
      case 'Salad':
        setFoodSelected(Salad)
        break
      case 'Pizza':
        setFoodSelected(Pizza)
        break
      case 'Pasta':
        setFoodSelected(Pasta)
      break
      case 'Dessert':
        setFoodSelected(Dessert)
      break
    }
  }, [category])
  
  console.log(foodSelected);
  
  return (
    <div className='explore_menu'>
      <h1>Let explore our menu</h1>
      <div className='explore_menu_list'>
        {menu_list.map((item, index) => {
            return (
                <div 
                    className='menu_item' 
                    key={index}
                    onClick={() => {
                      setCategory(item.name)
                    }}
                >
                    <img className={category === item.name ? 'active':''} src={item.menuImage} alt='' />
                    <p>{item.name}</p>
                </div>
            )
        })}
      </div>
      <div className='explore_wrapper'>
        {foodSelected && foodSelected.map((food, index) => {
          return (
            <FoodCard food={food} key={index}/>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu
