import React from 'react';
import Navbar from '../../components/shared/navbar/Navbar';
import { Outlet } from 'react-router';
import useAuth from '../../hooks/firebase/useAuth';
import PageLoader from '../../components/shared/pageLoader/PageLoader';
import Footer from '../../components/shared/footer/Footer';

const HomeLayout = () => {
    const { loading } = useAuth();

    if (loading) {
        return <PageLoader></PageLoader>
    }
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-502px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;