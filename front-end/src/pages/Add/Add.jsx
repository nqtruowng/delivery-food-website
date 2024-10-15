import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

import './Add.scss'
import { assets } from '../../assets/assets';

const Add = () => {
    const [image, setImage] = useState(false)
    const [submit, setSubmit] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setSubmit(submit => ({...submit, [name]: value}))
    }
    
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('name', submit.name)
        formData.append('description', submit.description)
        formData.append('price', submit.price)
        formData.append('category', submit.category)
        formData.append('image', image)
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/food/add`, formData)
        if (res.data.success) {
            setSubmit({
                name: '',
                description: '',
                price: '',
                category: 'Salad'
            })
            setImage(false)
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add_img_upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload} />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add_product_name flex-col">
                    <p>Product Name</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name here"
                        required
                        onChange={onChangeHandler} 
                        value={submit.name}
                    />
                </div>
                <div className="add_product_des flex-col">
                    <p>Product Description</p>
                    <textarea
                        name="description"
                        rows="6"
                        placeholder="Write description here"
                        required
                        onChange={onChangeHandler}
                        value={submit.description}
                    />
                </div>
                <div className="add_product_category_price">
                    <div className="add_category">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Appetizer">Appetizer</option>
                        </select>
                    </div>
                    <div className='add_price'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={submit.price} type='Number' name='price' placeholder='$10' />
                    </div>
                </div>
                <button className='add_btn' type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
