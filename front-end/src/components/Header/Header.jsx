import React, { useState } from 'react';
import { ShoppingCartRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import './Header.scss';
import { assets } from '../../assets/assets';
import { isLogin } from '../../GlobalState';

const Header = ({ setShowLogin }) => {
    const [url, setUrl] = useState('home')
    const navigate = useNavigate()
    const checkIsLogin = useRecoilValue(isLogin)
    
    return (
        <div className="header">
            <img src={assets.logo} alt="logo-website" className="logo" />
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
            <div className="header-right">
                <div className="shopping-cart">
                    <ShoppingCartRounded onClick={() => navigate('/cart')} />
                    <div className="dot"></div>
                </div>
                <div>
                    {   checkIsLogin ? 
                        <button className="user">
                            <img src={assets.user} />
                        </button> 
                        :
                        <button className="sign_in" onClick={() => setShowLogin(true)}>sign in</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;
