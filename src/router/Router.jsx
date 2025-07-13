import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/homePages/Home";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import AddProducts from "../components/dashboard/AddProducts/AddProducts";
import ProductDetails from "../pages/homePages/ProductDetails";
import AllProducts from "../pages/homePages/AllProducts";
import PrivateRoute from "../route/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element:<Home></Home>
      },
      {
        path: "/product/:id",
        element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: "/allProducts",
        element:<AllProducts></AllProducts>
      }
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "addProducts",
        element: <AddProducts></AddProducts>
      }
    ]
  }
]);
