import React from 'react';

import './UserLayout.scss'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const UserLayout = ({ children, setShowLogin }) => {
    return (
        <div className='wrapper_app'>
            <div className="app">
                <Header setShowLogin={setShowLogin} />
                {children}
            </div>
            <Footer className="footer" />
        </div>
    );
};

export default UserLayout;
