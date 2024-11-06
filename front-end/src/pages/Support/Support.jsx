import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { toast } from 'react-toastify'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

import './Support.scss'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { BsCameraVideoFill } from 'react-icons/bs'
import { FaExclamationCircle } from 'react-icons/fa'
import { FaPhoneAlt } from 'react-icons/fa'
import { assets } from '../../assets/assets'
import { userInfor } from '../../GlobalState'

const Support = () => {
    const [listUser, setListUser] = useState([])
    const [messages, setMessages] = useState([])
    const [onlineUser, setOnlineUser] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const user = useRecoilValue(userInfor)
    const socket = useRef()
    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, selectedUser])
    const fetchUser = async () => {
        const users = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user/list`
        )
        if (users.data.success) {
            setListUser(users.data.data)
        } else {
            toast.error('Loading error')
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    useEffect(() => {
        const findChat = async () => {
            const findChat = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/chat/find/${
                    selectedUser._id
                }/${import.meta.env.VITE_ADMIN_ID}`
            )
            if (findChat.data.chat === null) {
                const createChat = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/chat/${
                        selectedUser._id
                    }/${import.meta.env.VITE_ADMIN_ID}`
                )
                return createChat.data.chat._id
            } else {
                return findChat.data.chat._id
            }
        }
        const findMessage = async (chatId) => {
            const findMessage = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/message/${chatId}`
            )
            setMessages(findMessage.data)
        }
        findChat().then((res) => findMessage(res))
    }, [selectedUser._id])

    //send message to socket
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])
    //add user to  socket
    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit('add-new-user', user._id)
        socket.current.on('get-users', (users) => {
            setOnlineUser(users)
        })
    })
    //receive message to socket
    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            setReceiveMessage(data)
        })
    }, [])
    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        const findChat = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/chat/find/${
                selectedUser._id
            }/${import.meta.env.VITE_ADMIN_ID}`
        )

        const message = {
            senderId: user._id,
            text: newMessage,
            chatId: findChat.data.chat._id,
        }

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/message`,
                message
            )
            setMessages([...messages, data])
            setNewMessage('')
        } catch (error) {
            console.log(e)
        }

        const receiverId = findChat.data.chat.members.find((id) => id !== user._id)
        setSendMessage({ ...message, receiverId })
    }

    return (
        <div className="chat_content">
            <div className="content_sidebar">
                <div className="content_sidebar_title">Chats</div>
                <form className="content_sidebar_form">
                    <div className="search">
                        <input placeholder="" spellCheck={false} />
                        <button type="button" className="search-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </form>
                <div className="content_messages">
                    {listUser &&
                        listUser.map((user) => {
                            return (
                                <div
                                    key={user._id}
                                    className={`user ${
                                        selectedUser.username === user.username
                                            ? 'selected'
                                            : ''
                                    }`}
                                    onClick={() => setSelectedUser(user)}
                                >
                                    <div className="avatar_user">
                                        <img src={assets.user} />
                                    </div>
                                    <div className="username">
                                        <p>{user.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className="content_conversation">
                {selectedUser !== '' && (
                    <>
                        <div className="header_conversation">
                            <div className="user">
                                <div className="avatar_user">
                                    <img src={assets.user} />
                                </div>
                                <div className="username">
                                    <p>{selectedUser.username}</p>
                                </div>
                            </div>
                            <div className="options">
                                <div className="option">
                                    <FaPhoneAlt />
                                </div>
                                <div className="option">
                                    <BsCameraVideoFill />
                                </div>
                                <div className="option">
                                    <FaExclamationCircle />
                                </div>
                            </div>
                        </div>
                        <div className="main_conversation">
                            <div className="wrapper_content_chat">
                                {messages.map((message) => {
                                    return (
                                        <div
                                            className={`chat ${
                                                selectedUser._id !==
                                                message.senderId
                                                    ? 'outgoing'
                                                    : 'incoming'
                                            }`}
                                            key={message._id}
                                            ref={scroll}
                                        >
                                            <div>
                                                <span>{message.text}</span>
                                                <span>
                                                    {format(message.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="input">
                                <div class="messageBox">
                                    <input
                                        required=""
                                        placeholder="Message..."
                                        type="text"
                                        id="messageInput"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="send"
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Support
