import React from 'react';

import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './AdminLayout.scss'

const AdminLayout = ({ children }) => {
    return (
        <div className="">
            <NavBar />
            <hr />
            <div className='app_content'>
                <SideBar />
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
