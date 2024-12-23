import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'

import "./Orders.scss"
import { assets } from '../../assets/assets'
import { userInfor } from '../../GlobalState'
import { Value } from 'sass'

const Orders = () => {
  const [orders, setOrders] = useState()
  const user = useRecoilValue(userInfor)
  const currentYear = new Date().getFullYear()

  const fetchOrders = async () => {
     const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/list/${currentYear}`)
     if (res.data.success) {
      setOrders(res.data.data)
     }
  }

  setInterval(() => {
    fetchOrders()
  }, 60000)

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusHandle = async (event, orderId) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (res.data.success) {
      await fetchOrders()
    }
  }

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order_list">
        {orders && orders.map((order, index) => {
          return (
            <div key={index} className="order_item">
              <img src={assets.parcel} alt='parcel' />
              <div>
                <p className='order_item_food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.amount
                    } else {
                      return item.name + " x " + item.amount + ', '
                    }
                  })}
                </p>
                <p className="order_item_name_address">{order.name + " - " + order.address}</p>
                <p className='order_item_phone'>{order.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandle(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
