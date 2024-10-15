import React from 'react';
import { AddCircleOutlineRounded, ChecklistRounded, InventoryRounded } from '@mui/icons-material'
import { NavLink } from 'react-router-dom';

import './SideBar.scss'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar_options">
                <NavLink to='/admin/add' className="sidebar_option">
                    <AddCircleOutlineRounded />
                    <p>Add items</p>
                </NavLink>
                <NavLink to='/admin/list' className="sidebar_option">
                    <ChecklistRounded />
                    <p>List items</p>
                </NavLink>
                <NavLink to='/admin/orders' className="sidebar_option">
                    <InventoryRounded />
                    <p>Oders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default SideBar;
