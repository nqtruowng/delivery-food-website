import React from 'react'

import './NavBar.scss'
import { assets } from '../../assets/assets.js'

const NavBar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="logo" />
      <img className='profile' src={assets.logo} alt="" />
    </div>
  )
}

export default NavBar
