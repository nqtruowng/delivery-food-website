import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

import './MyOrder.scss'
import { userInfor } from '../../GlobalState'
import { assets } from '../../assets/assets'

const MyOrder = () => {
  const [listOrders, setLisOrders] = useState()
  const user = useRecoilValue(userInfor)
  const fetchOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/userorders/${user._id}`)
    setLisOrders(res.data.data)
  }

  const loaddingDeliveryState = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/userorders/${user._id}`)
    setLisOrders(res.data.data)
  }
  
  useEffect(() => {
      fetchOrders();
  }, [])

  setInterval(() => {
    fetchOrders()
  }, 60000)
  
  return (
    <div className='my_orders'>
      <h1>My Orders</h1>
      <div className='container'>
        {listOrders && listOrders.map((order, index) => {
          return (
            <div key={index} className='my_order'>
              <img src={assets.parcel} alt='parcel'></img>
              <p>{order && order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + ' x ' + item.amount
                } else {
                  return item.name + ' x ' + item.amount + ', '
                }
              })}</p>
              <p>${order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              <button onClick={loaddingDeliveryState}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrder
