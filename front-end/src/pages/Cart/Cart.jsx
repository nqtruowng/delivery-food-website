import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import './Cart.scss';
import { itemCart } from '../../GlobalState';

const Cart = () => {
    const cart = useRecoilValue(itemCart)

    return (
        <div className="cart">
            <div className="cart_items">
                <div className="cart_items_details">
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
                
            })}
        </div>
    );
};

export default Cart;
