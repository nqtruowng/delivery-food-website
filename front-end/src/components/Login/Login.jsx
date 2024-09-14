import React, { useState } from 'react';

import { CloseRounded } from '@mui/icons-material';
import './Login.scss';

const Login = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState('Login');

    return (
        <div className="login">
            <div className="login_container">
                <div className="login_title">
                    <h2>{currentState}</h2>
                    <CloseRounded className='close_button' onClick={() => setShowLogin(false)} />
                </div>
                <div className="login_inputs">
                    <input type="text" placeholder="Enter your username" />
                    <input type="password" placeholder="Enter your password" />
                    {currentState === 'Sign Up' ? (
                        <input
                            type="password"
                            placeholder="Comfirm your password"
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <button>
                    {currentState === 'Login' ? 'Login' : 'Sign up'}
                </button>
                <div className="login_conditions">
                    <input type="checkbox" required />
                    <p>
                        By continuing, i agree to the terms of use & privacy
                        police
                    </p>
                </div>
                {currentState === 'Login' ? (
                    <p>
                        Create a new account ? <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account ? <span onClick={() => setCurrentState('Login')}>Login here</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
