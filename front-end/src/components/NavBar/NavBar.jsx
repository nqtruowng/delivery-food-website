import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';

import './NavBar.scss'
import { assets } from '../../assets/assets.js'
import { isLogin, userInfor } from '../../GlobalState';

const NavBar = () => {
  const [signOut, setSignOut] = useState(false)
  const setUser = useSetRecoilState(userInfor)
  const setLogIn = useSetRecoilState(isLogin)
  const handleSignOut = () => {
    localStorage.setItem('admintoken', '')
    setUser({})
    setLogIn(false)
    window.location.href = '/'
  }

    return (
        <div className="navbar">
            <img className="logo" src={assets.logo} alt="logo" />
            <div>
                <button className='user'>
                    <img className="profile" src={assets.user} alt="user" onClick={() => setSignOut(!signOut)} />
                    <div className={`signout ${signOut ? 'show_signout' : ''}`} onClick={handleSignOut}>
                        <p>Sign Out</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default NavBar
