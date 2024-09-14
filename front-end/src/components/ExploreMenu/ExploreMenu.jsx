import React, { useState } from 'react'

import './ExploreMenu.scss'
import { menu_list } from '../../assets/assets'

const ExploreMenu = () => {
    const [category, setCategory] = useState('All')

  return (
    <div className='explore_menu'>
      <h1>Let explore our menu</h1>
      <div className='explore_menu_list'>
        {menu_list.map((item, index) => {
            return (
                <div 
                    className='menu_item' 
                    key={index}
                    onClick={() => setCategory(item.name)}
                >
                    <img className={category === item.name ? 'active':''} src={item.menuImage} alt='' />
                    <p>{item.name}</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu
