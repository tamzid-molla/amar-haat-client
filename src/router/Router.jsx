import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/homeLayout/HomeLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/homePages/Home";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";

import ProductDetails from "../pages/homePages/ProductDetails";
import AllProducts from "../pages/homePages/AllProducts";
import PrivateRoute from "../route/PrivateRoute";
import StripePayment from "../pages/StripePayment/StripePayment";
import PriceTrends from "../pages/dashboardPages/PriceTrends";
import AddProducts from "../pages/dashboardPages/AddProducts";
import MyWatchList from "../pages/dashboardPages/MyWatchList";
import MyOrders from "../pages/dashboardPages/MyOrders";
import AddAdvertisement from "../pages/dashboardPages/AddAdvertisement";
import MyProducts from "../pages/dashboardPages/MyProducts";
import UpdateProduct from "../pages/dashboardPages/UpdateProduct";
import MyAdvertise from "../pages/dashboardPages/MyAdvertise";
import AllUser from "../pages/AdminPages/AllUser";
import Products from "../pages/AdminPages/Products";
import AllAdvertise from "../pages/AdminPages/AllAdvertise";
import AllOrders from "../pages/AdminPages/AllOrders";
import Profile from "../pages/Profile/Profile";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminRoute from "../route/AdminRoute";
import VendorRoute from "../route/VendorRoute";
import AdminAndVendorRoute from "../route/AdminAndVendorRoute";


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
        path: "/payment/:id",
        element:<PrivateRoute><StripePayment></StripePayment> </PrivateRoute>
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
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: "addProducts",
        element: <VendorRoute><AddProducts></AddProducts></VendorRoute>
      },
      {
        path: "priceTrends",
        element: <PrivateRoute><PriceTrends></PriceTrends></PrivateRoute>
      },
      {
        path: "watchList",
        element: <PrivateRoute><MyWatchList></MyWatchList></PrivateRoute>
      },
      {
        path: "myOrders",
        element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
      },
      {
        path: "addAdvertisement",
        element: <VendorRoute><AddAdvertisement></AddAdvertisement></VendorRoute>
      },
      {
        path: "myProducts",
        element: <VendorRoute><MyProducts></MyProducts></VendorRoute>
      },
      {
        path: "update_product/:id",
        element: <AdminAndVendorRoute><UpdateProduct></UpdateProduct></AdminAndVendorRoute>
      },
      {
        path: "myAdvertisements",
        element: <VendorRoute><MyAdvertise></MyAdvertise></VendorRoute>
      },
      {
        path: "allUsers",
        element:<AdminRoute> <AllUser></AllUser></AdminRoute>
      },
      {
        path: "allProducts",
        element: <AdminRoute><Products></Products></AdminRoute>
      },
      {
        path: "allAdvertisements",
        element: <AdminRoute><AllAdvertise></AllAdvertise></AdminRoute>
      },
      {
        path: "allOrders",
        element: <AdminRoute><AllOrders></AllOrders></AdminRoute> 
      },
      {
        path: "profile",
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
    ]
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);
