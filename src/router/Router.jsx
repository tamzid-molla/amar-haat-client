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
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "addProducts",
        element: <AddProducts></AddProducts>
      },
      {
        path: "priceTrends",
        element: <PriceTrends></PriceTrends>
      },
      {
        path: "watchList",
        element: <MyWatchList></MyWatchList>
      },
      {
        path: "myOrders",
        element: <MyOrders></MyOrders>
      },
      {
        path: "addAdvertisement",
        element: <AddAdvertisement></AddAdvertisement>
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>
      },
      {
        path: "update_product/:id",
        element: <UpdateProduct></UpdateProduct>
      },
      {
        path: "myAdvertisements",
        element: <MyAdvertise></MyAdvertise>
      },
      // {
      //   path: "updateAdvertisement/:id",
      //   element: <UpdateAdvertise></UpdateAdvertise>
      // },
    ]
  }
]);
