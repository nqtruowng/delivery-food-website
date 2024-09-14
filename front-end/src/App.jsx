import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import { publicRoutes } from './router/router';

const App = () => {
    const [showLogin, setShowLogin] = useState(false)

    return (
        <Router>
            {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
            <div className="app">
                <Header setShowLogin={setShowLogin} />
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<route.component />}
                                />
                            );
                        })}
                    </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
