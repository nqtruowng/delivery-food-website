import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

import Login from './components/Login/Login'
import { publicRoutes, adminRoutes } from './router/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isLogin, userInfor } from './GlobalState'
import UserChatBox from './components/UserChatBox/UserChatBox'

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
  
    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;  // Nếu cookie không tồn tại
  }
  
const App = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isUser, setIsUser] = useState()
    const [route, setRoute] = useState(publicRoutes)
    const user = useRecoilValue(userInfor)
    const setUser = useSetRecoilState(userInfor)
    const setLogin = useSetRecoilState(isLogin)
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        if (user.role === 'admin') {
            setRoute(adminRoutes)
            setIsUser(false)
            // window.location.href = '/admin/add'
        } else if (user.role === 'user') {
            setIsUser(true)
        }
    }, [user])

    useEffect(() => {
        // const usertoken = localStorage.getItem('usertoken')
        // const admintoken = localStorage.getItem('admintoken')
        const token = getCookie('token')
        console.log(token)
        if (token) {
            (async () => {
                const user = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/user/login`, {token}
                )
                if (user.data.success) {
                    setUser(user.data.user)
                    setLogin(true)
                }
            })()
        }
    }, [])

    // useEffect(() => {
    //     if (user.role === 'admin') {
    //         window.location.href = '/admin/add'
    //     } else if ( user.role === 'user') {
    //         window.location.href = ''
    //     }
    // }, [])
    

    return (
        <Router>
            {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
            <ToastContainer />
            {isUser ? (
                <UserChatBox />
            ) : (
                ''
            )}
            <Routes>
                {route.map((route, index) => {
                    const Layout = route.layout
                    const Page = route.component
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout setShowLogin={setShowLogin}>
                                    <Page />
                                </Layout>
                            }
                        />
                    )
                })}
            </Routes>
        </Router>
    )
}

export default App
