import React from 'react'

import { assets } from '../../assets/assets'
import './Presentation.scss'
import { useNavigate } from 'react-router-dom'

const Presentation = () => {
  const navigate = useNavigate()

  return (
    <div className='wrapper'>
      <video autoPlay muted loop className='presentation'>
        <source src={assets.present} type='video/mp4' />
      </video>
      <div className='content'>
        <p>Choose from diverse menu featuring a delectable array of dishes
           crafted with the finest ingredients and culinary expertise.
           Our mission is to satisfy your cravings and elevate your dining
           experience, one delicious meal at all time
        </p>
      </div>
    </div>
  )
}

export default Presentation
