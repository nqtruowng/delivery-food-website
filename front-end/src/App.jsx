import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './components/Login/Login'
import { publicRoutes, adminRoutes } from './router/router'
import { useRecoilValue } from 'recoil'
import { userInfor } from './GlobalState'
import UserChatBox from './components/UserChatBox/UserChatBox'

const App = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isUser, setIsUser] = useState()
    const [route, setRoute] = useState(publicRoutes)
    const user = useRecoilValue(userInfor)
    useEffect(() => {
        if (user.role === 'admin') {
            setRoute(adminRoutes)
            setIsUser(false)
        } else if (user.role === 'user') {
            setIsUser(true)
        }
    }, [user])

    console.log(user);
    

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
