import {
  createBrowserRouter,
} from "react-router";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import ForgotPassword from "../pages/ForgetPass/ForgetPassword";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardHome from "../Dashboard/DashboardHome";
import AdminRoute from "../routes/AdminRoute";
import VendorRoute from "../routes/VendorRoute";
import AddProduct from "../Dashboard/vendor/AddProduct";
import MyProducts from "../Dashboard/vendor/MyProducts";
import AllAds from "../Dashboard/admin/AllAds";
import AllUsers from "../Dashboard/admin/AllUsers";
import AllProducts from "../Dashboard/admin/AllProducts";
import AllOrder from "../Dashboard/admin/AllOrder";
import AddAds from "../Dashboard/vendor/AddAds";
import MyAds from "../Dashboard/vendor/MyAds";
import ViewPriceTrend from "../Dashboard/user/ViewPriceTrend";
import ManageWatchlist from "../Dashboard/user/ManageWatchlist";
import MyOrderList from "../Dashboard/user/MyOrderList";
import UserRoute from "../routes/UserRoute";
import UpdateProduct from "../Dashboard/vendor/UpdateProduct";
import ProductDetails from "../pages/Home/ProductDetails";
import NavAllProducts from "../components/NavAllProducts";
import Payment from "../pages/Home/Payment/Payment";
import ErrorPage from "../components/ErrorPage";
import Newsletter from "../pages/Home/NewsLetter";
import AdminNewsletter from "../components/AdminNewsletter";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signup",
          element: <Register />
        },
        {
          path: "all-products",
          element: <NavAllProducts />
        },
        {
          path: 'forgot',
          element: <ForgotPassword />
        },
        {
          path: "products/:id",
          element: <ProductDetails />
        },
        {
          path: 'payment/:productId',
          element: <Payment />
        }
      
    ],
    errorElement: <ErrorPage />
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRoute >
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'admin/all-users',
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        )
      },
      {
        path: 'admin/all-products',
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        )
      },
         {
        path: 'admin/all-ads',
        element: (
          <AdminRoute>
           <AllAds />
          </AdminRoute>
        )
      },
         {
        path: 'admin/all-order',
        element: (
          <AdminRoute>
           <AllOrder />
          </AdminRoute>
        )
      },
      {
        path: 'admin/newsletter-subscribers',
        element: (
          <AdminRoute>
            <AdminNewsletter />
          </AdminRoute>
        )
      },
      {
        path: 'vendor/add-products',
        element: (
          <VendorRoute>
              <AddProduct />
          </VendorRoute>
        )
      },
      {
        path: 'vendor/my-products',
        element: (
          <VendorRoute>
            <MyProducts />
          </VendorRoute>
        )
      },
      {
        path: 'vendor/add-ads',
        element: (
          <VendorRoute>
            <AddAds />
          </VendorRoute>
        )
      },
      {
        path: 'vendor/my-ads',
        element: (
          <VendorRoute>
            <MyAds />
          </VendorRoute>
        )
      },
      {
  path: "/dashboard/vendor/update-product/:id",
  element: (
    <VendorRoute>
      <UpdateProduct />
    </VendorRoute>
  )
},
      {
        path: 'user/price-trends',
        element:           
        <UserRoute>
          <ViewPriceTrend />
        </UserRoute>
      },
      {
        path: 'user/watchlist',
        element: <UserRoute>
          <ManageWatchlist />
      </UserRoute>
      },
      {
        path: 'user/my-orders',
        element:  <UserRoute>
          <MyOrderList />
        </UserRoute>
      },
    ],
  }
]);