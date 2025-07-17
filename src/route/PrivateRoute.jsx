
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/firebase/useAuth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
    const { user,loading } = useAuth()

    if (!user && !loading) {
        return <Navigate to='/login' state={location?.pathname}></Navigate>
    }
    return (
      children
    );
};

export default PrivateRoute;
