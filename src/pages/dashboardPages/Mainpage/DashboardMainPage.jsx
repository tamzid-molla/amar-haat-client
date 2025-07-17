import React from 'react';
import useAuth from '../../../hooks/firebase/useAuth';
import AdminMainPage from '../../AdminPages/AdminMainPage';
import VendorMainPage from './VendorMainPage/VendorMainPage';
import UserMainPage from './UserMainPage/UserMainPage';

const DashboardMainPage = () => {
    const { role } = useAuth();
    return (
        <div>
            {role === "admin" && <AdminMainPage></AdminMainPage>}
            {role === "vendor" && <VendorMainPage></VendorMainPage>}
            {role === "user" && <UserMainPage></UserMainPage>}
        </div>
    );
};

export default DashboardMainPage;