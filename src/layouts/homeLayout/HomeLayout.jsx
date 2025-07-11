import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;