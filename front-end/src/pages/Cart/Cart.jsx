import React, { useMemo, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify'
import axios from 'axios'

import './Cart.scss';
import { cartItem, userInfor } from '../../GlobalState';
import { assets } from '../../assets/assets'

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

const Cart = () => {
    const user = useRecoilValue(userInfor)
    const cart = useRecoilValue(cartItem)
    const setCartItem = useSetRecoilState(cartItem)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    let token = getCookie('token')
    const handleMinusItem = (food)  => {
        const newItems = cart.map((item) => {
            if (item._id === food._id)  {
                return {...item, amount: item.amount - 1}
            }
            return item
        })
        const filterItems = newItems.filter((item) => item.amount !== 0)
        setCartItem(filterItems)
    }
    const handlePlusItem = (food) => {
        const newItems = cart.map((item) => {
            if (item._id === food._id)  {
                return {...item, amount: item.amount + 1}
            }
            return item
        })
        setCartItem(newItems)
    }
    const handleOnClickProcess = async (e) => {
        if (Object.keys(user).length === 0) {
            toast.error("Please login your account")
        } 
        else {
            if (name.trim() === '' || phone.trim() === '' || address.trim() === '') {
                toast.warning('Please fill your delivery information')
            } else {
                e.preventDefault()
                let orderData = {
                    userId: user._id,
                    items: cart,
                    amount: (1.1 * subTotal).toFixed(2),
                    address: address,
                    name: name,
                    phone: phone
                }
                let res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/place`, orderData, {headers: {token, 'Authorization': 'Bearer sk_test_51QJSovFzD2I8mRGFHALCG14rJH67Bi8e5xHHGg1lhUlx7kn2mdSD25NfJqz36QuE5PDQmswhMLr8zcnKEok2nUti00XAhKWRcH'}})
                if (res.data.success) {
                    const { session_url } = res.data
                    window.location.replace(session_url)
                } else {
                    alert('Error')
                }
            }
        }
    }

    const subTotal = useMemo(() => {
        const result = cart.reduce((result, item) => {
            return result + (item.price * item.amount)
        }, 0)
        return result
    }, [cart])
    console.log(cart);
    
    return (
        <div className="cart">
            <div className="cart_management">
                <div className="cart_list">
                    <div className="cart_title">
                        <h2>Product details</h2>
                    </div>
                    <div className="item_foods">
                        {cart.map((item) => {
                            return (
                                <div className="item_food" key={item.name}>
                                    <div className="image_container">
                                        <img src={`${import.meta.env.VITE_API_URL}/images/${item.image}`} alt="image" />
                                    </div>
                                    <div className="item_detail">
                                        <p>{item.name}</p>
                                        <div className="price_amount">
                                            <div className="amount">
                                                <button onClick={() => handleMinusItem(item)}><img src={assets.iconMinus} /></button>
                                                <span>{item.amount}</span>
                                                <button onClick={() => handlePlusItem(item)}><img src={assets.iconPlus} /></button>
                                            </div>
                                            <p>
                                                {item.price * item.amount}$
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="delivery_information">
                    <h2>Delivery Information</h2>
                    <div className="inputGroup">
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}/>
                        <label className="label" >Name</label>
                    </div>
                    <div className="inputGroup">
                        <input type="number" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <label >Phone</label>
                    </div>
                    <div className="inputGroup">
                        <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}/>
                        <label >Address</label>
                    </div>
                </div>
                <div className="invoice">
                    <div className='invoice_title'>
                        <h2>Order summary</h2>
                    </div>
                    <div className='invoice_details'>
                        <div>
                            <p>{`Delivery items (${cart.length})`}</p>
                            <div className='invoice_fee'>
                                <div className="invoice_fee_detail">
                                    <p>Sub-total:</p>
                                    <p>{`${cart.length !== 0 ? subTotal : ''}$`}</p>
                                </div>
                                <div className="invoice_fee_detail">
                                    <p>Shipping fee:</p>
                                    <p>{`${cart.length !== 0 ? 'free' : ''}`}</p>
                                </div>
                                <div className="invoice_fee_detail">
                                    <p>VAT 10%:</p>
                                    <p>{`${cart.length !== 0 ? (0.1 * subTotal).toFixed(2) : ''}$`}</p>
                                </div>
                            </div>
                            <div className='total'>
                                <p>Total:</p>
                                <p>{`${subTotal && (1.1 * subTotal).toFixed(2) || ''}$`}</p>
                            </div>
                            <div className='delivery'>
                                <p>Delivery to: </p>
                                <p>{`${name} - ${address}`}</p>
                            </div>
                        </div>
                        <div className='process'>
                            <button type='submit' onClick={handleOnClickProcess}>
                                <p>{`${subTotal && (1.1 * subTotal).toFixed(2) || ''}$`}</p>
                                <p>Process</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
