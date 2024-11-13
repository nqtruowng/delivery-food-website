import React, { useState } from 'react';
import { ShoppingCartRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsList } from "react-icons/bs";

import './Header.scss';
import { assets } from '../../assets/assets';
import { isLogin, userInfor } from '../../GlobalState';

const Header = ({ setShowLogin }) => {
    const [url, setUrl] = useState('home')
    const [showDropdown, setShowDropdown] = useState(false)
    const [signOut, setSignOut] = useState(false)
    const navigate = useNavigate()
    const checkIsLogin = useRecoilValue(isLogin)
    const setUser = useSetRecoilState(userInfor)
    const setLogIn = useSetRecoilState(isLogin)

    const handleSignOut = () => {
        localStorage.setItem('usertoken', '')
        setUser({})
        setLogIn(false)
    }
    
    return (
        <div className="header">
            <img src={assets.logo} alt="logo-website" className="logo" />
            <div className={`wrapper_header_left ${showDropdown ? 'show' : 'not_show'}`}>
                <ul className="header-left">
                    <li
                        onClick={() => {
                            setUrl('home')
                            navigate('/')
                        }}
                        className={url === 'home' ? 'active' : ''}
                    >
                        home
                    </li>
                    <li
                        onClick={() => {
                            setUrl('menu')
                            navigate('/menu')
                        }}
                        className={url === 'menu' ? 'active' : ''}
                    >
                        menu
                    </li>
                    <li
                        onClick={() => {
                            setUrl('my-order')
                            navigate('/my-order')
                        }}
                        className={url === 'my-order' ? 'active' : ''}
                    >
                        my-order
                    </li>
                    <li
                        onClick={() => {
                            setUrl('contact-us')
                            navigate('/contact-us')
                        }}
                        className={url === 'contact-us' ? 'active' : ''}
                    >
                        contact us
                    </li>
                </ul>
            </div>
            <div className="header-right">
                <div className="shopping-cart">
                    <ShoppingCartRounded onClick={() => navigate('/cart')} />
                    <div className="dot"></div>
                </div>
                <div>
                    {   checkIsLogin ? 
                        <div>
                            <button className="user" >
                                <img src={assets.user} onClick={() => setSignOut(!signOut)}/>
                                <div className={`signout ${signOut ? 'show_signout' : ''}`} onClick={handleSignOut}>
                                    <p>Sign Out</p>
                                </div>
                            </button>
                            <button className={`dropdown`} onClick={() => setShowDropdown(!showDropdown)}>
                                <BsList style={{ width: '30px', height: '30px' }} />
                            </button>
                        </div>
                        :
                        <button className="sign_in" onClick={() => setShowLogin(true)}>sign in</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
