import React, { useEffect, useState, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

import './UserChatBox.scss'
import axios from 'axios'
import { userInfor } from '../../GlobalState'

const UserChatBox = () => {
    const [showPopUpChat, setShowPopUpChat] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const user = useRecoilValue(userInfor)
    const handleOnClickIconButton = () => {
        setShowPopUpChat(!showPopUpChat)
    }
    const socket = useRef()
    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, showPopUpChat])
    useEffect(() => {
        const findChat = async () => {
            const findChat = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/chat/find/${user._id}/${
                    import.meta.env.VITE_ADMIN_ID
                }`
            )
            if (findChat.data.chat === null) {
                const createChat = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/chat/${user._id}/${
                        import.meta.env.VITE_ADMIN_ID
                    }`
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
        findChat().then(res => findMessage(res))
    }, [])

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

    const handleOnClickSendButton = async (e) => {
        e.preventDefault()
        const findChat = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/chat/find/${
                user._id
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
        <div className="show_chatting">
            <button
                className={`chat_icon ${showPopUpChat ? 'show' : 'hide'}`}
                onClick={handleOnClickIconButton}
            >
                <span className="material-symbols-outlined">mode_comment</span>
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="chatting">
                <header>
                    <h2>Support</h2>
                </header>
                <div className="chatbox">
                    {messages.map((message) => {
                        return (
                            <div
                                className={`chat ${
                                    user._id === message.senderId
                                        ? 'outgoing'
                                        : 'incoming'
                                }`}
                                key={message._id}
                                ref={scroll}
                            >
                                <div>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="chat_input">
                    <textarea placeholder="Enter a message ..." required onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
                    <span
                        className="material-symbols-outlined send_btn"
                        onClick={handleOnClickSendButton}
                    >
                        send
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserChatBox
