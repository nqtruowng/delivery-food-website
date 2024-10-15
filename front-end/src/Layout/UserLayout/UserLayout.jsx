import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const UserLayout = ({ children, setShowLogin }) => {
    return (
        <div>
            <div className="app">
                <Header setShowLogin={setShowLogin} />
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default UserLayout;
