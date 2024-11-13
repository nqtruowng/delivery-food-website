import React from 'react'

import './Contact.scss'
import { assets } from '../../assets/assets'
const Contact = () => {
  return (
    <div className="container">
        <h1>Get in Touch</h1>
        <div className="contact-box">
            <div className="container-left">
                <img src={assets.burger} alt="Contact Us" />
            </div>
            <div className="container-right">
                <h3>Reach Us</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Email: </td>
                            <td>vandung104@gmail.com</td>
                        </tr>
                        <tr>
                            <td>Phone: </td>
                            <td>+84 989213213</td>
                        </tr>
                        <tr>
                            <td>Address: </td>
                            <td>University of Transport and Communications <br />
                                3 Đ. Cầu Giấy, Ngọc Khánh, Đống Đa, <br />
                                Hà Nội</td>
                        </tr>
                    </tbody>
                  </table>
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109137.29573829129!2d105.69822668548566!3d20.957250402149104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab424a50fff9%3A0xbe3a7f3670c0a45f!2sUniversity%20of%20Transport%20and%20Communications!5e1!3m2!1sen!2s!4v1731415867935!5m2!1sen!2s" style={{ width: "600px", height: "450px"}}   allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Contact
