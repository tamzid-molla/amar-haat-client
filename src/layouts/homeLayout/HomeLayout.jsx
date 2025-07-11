import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import { Outlet } from 'react-router';
import useAuth from '../../hooks/firebase/useAuth';
import PageLoader from '../../components/shared/pageLoader/PageLoader';

const HomeLayout = () => {
    const { loading } = useAuth();

    if (loading) {
        return <PageLoader></PageLoader>
    }
    return (
        <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default HomeLayout;