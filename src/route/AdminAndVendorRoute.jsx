import PageLoader from '../components/shared/pageLoader/PageLoader';
import useAuth from '../hooks/firebase/useAuth';
import { Navigate } from 'react-router';

const AdminAndVendorRoute = ({children}) => {
    const { user,loading,role,isPending } = useAuth();

    if (loading || isPending) {
        return <PageLoader></PageLoader>
    }

    if (!user || role === "user") {
        return <Navigate to="/forbidden"></Navigate>
    }
    return children
};

export default AdminAndVendorRoute;