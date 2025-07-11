import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/FirebaseContext/FirebaseContext';

const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default useAuth;