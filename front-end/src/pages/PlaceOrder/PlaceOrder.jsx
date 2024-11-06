import React from 'react'

import './PlaceOrder.scss'

const PlaceOrder = () => {
  return (
    <div>
      <form className="place_order">
      <div className="place_order_left">
        <p>Delivery Information</p>
        <div className="multi_fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="text" />
        <input type="text" />
      </div>
    </form>
    </div>
  )
}

export default PlaceOrder
