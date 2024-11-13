import React, { useState } from 'react'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

import { CloseRounded } from '@mui/icons-material'
import './Login.scss'
import { isLogin, userInfor } from '../../GlobalState'

const Login = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState('Login')
    const [ userData, setUserData ] = useState({})
    const setUser = useSetRecoilState(userInfor)
    const setIsLogin = useSetRecoilState(isLogin)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUserData({ ...userData, [name]: value })
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let url = import.meta.env.VITE_API_URL
        if (currentState === 'Login') {
            url += '/api/user/login/'
            const res = await axios.post(url, userData)

            if (res.data.success) {
                setToken(res.data.token)
                setShowLogin(false)
                setUser(res.data.user)
                setIsLogin(true)
                if (res.data.user.role === "admin") {
                    // localStorage.setItem("admintoken", res.data.token)
                    document.cookie = `token = ${res.data.token}`
                    navigate("/admin/add")
                } else if (res.data.user.role === "user") {
                    // localStorage.setItem("usertoken", res.data.token)
                    document.cookie = `token = ${res.data.token}`
                }
            } else {
                alert(res.data.message)
            }
        } else {
            url += '/api/user/register'
            
            if (userData.password !== userData.repassword) {
                toast.error("Your password and password comfirm are wrong")
                const res = await axios.post(url, userData)
            } else {
                const res = await axios.post(url, userData)
                if (!res.data.success) {
                    toast.error("User has been exist")
                } else {
                    toast.success("Create successfull")
                }
            }
        }
        
    }
    
    return (
        <div className="login">
            <form onSubmit={onLogin} className="login_container">
                <div className="login_title">
                    <h2>{currentState}</h2>
                    <CloseRounded
                        className="close_button"
                        onClick={() => setShowLogin(false)}
                    />
                </div>
                <div className="login_inputs">
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={userData.username}
                    />
                    <input
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={userData.password}
                    />
                    {currentState === 'Sign Up' ? (
                        <input
                            onChange={onChangeHandler}
                            name="repassword"
                            type="password"
                            placeholder="Comfirm your password"
                            value={userData.repassword}
                        />
                    ) : (
                        <></>
                    )}
                </div>
                <button type="submit">
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
                        Create a new account ?{' '}
                        <span onClick={() => setCurrentState('Sign Up')}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account ?{' '}
                        <span onClick={() => setCurrentState('Login')}>
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default Login
