import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from  'axios'

import './Verify.scss'
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const success = searchParams.get("success")
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/verify`, {success, orderId})
        if(res.data.success) {
            setTimeout(() => {
              navigate('/my-order')
            }, 5000)
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
