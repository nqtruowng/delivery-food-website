import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import './Cart.scss';
import { cartItem } from '../../GlobalState';

const Cart = () => {
    const cart = useRecoilValue(cartItem)
    const navigate = useNavigate()

    return (
        <div className="cart">
            <div>
                <div className="cart_items">
                    <div className="cart_items_title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br />
                    <hr />
                </div>
                {cart.length > 0 && cart.map((item, index) => {
                    return (
                        <div>
                            <div key={index} className="cart_items_title cart_items_item">
                                <img src={item.image} alt="foodImage" />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{item.amount}</p>
                                <p>${item.price * item.amount}</p>
                                <p className="cross">x</p>
                            </div>
                            <hr />
                        </div>
                    )
                })}
            </div>
            <div className="cart_bottom">
                <div className="cart_total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart_total_detail">
                            <p>Subtotal</p>
                            <p></p>
                        </div>
                        <hr />
                        <div className="cart_total_detail">
                            <p>Delivery fee: Shipping fees are not included</p>
                        </div>
                        <hr />
                    </div>
                    <button onClick={() => navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
