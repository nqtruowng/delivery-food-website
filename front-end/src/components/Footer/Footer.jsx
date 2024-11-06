import React from 'react';

import './Footer.scss';
import { assets } from '../../assets/assets';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_content">
                <div className="footer_content_left">
                    <img src={assets.logo} alt="" className='footer_logo' />
                    <div className='social'>
                        <div>
                            <a href='https://www.facebook.com/Pizza4Ps' target='blank'>
                                <img src={assets.facebook} alt="" className='social_network'/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.instagram.com/pizza4ps' target='blank'>
                                <img src={assets.insta} alt="" className='social_network'/>
                            </a>
                        </div>
                        <div>
                            <a href='https://www.linkedin.com/company/pizza4ps/?originalSubdomain=vn' target='blank'>
                                <img src={assets.linkedin} alt='' className='social_network' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer_content_center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer_content_right">
                    <h2>Contact</h2>
                    <ul>
                        <li>19006043</li>
                        <li>www.mywebsite.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='copyright'>Copyright © 2024 Pizza 4P’s. All Rights Reserved</p>
        </div>
    );
};

export default Footer;
