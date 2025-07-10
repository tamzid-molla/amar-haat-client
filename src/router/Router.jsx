import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path: '/login',
                element:<Login></Login>
            }
        ]
    }
])