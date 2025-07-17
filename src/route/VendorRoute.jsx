import { Navigate } from 'react-router';
import useAuth from '../hooks/firebase/useAuth';
import PageLoader from '../components/shared/pageLoader/PageLoader';

const VendorRoute = ({ children }) => {
    const { user,loading,role,isPending } = useAuth();

    if (loading || isPending) {
        return <PageLoader></PageLoader>
    }

    if (!user || role !== "vendor") {
        return <Navigate to="/forbidden"></Navigate>
    }
    return children
};

export default VendorRoute;