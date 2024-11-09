import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './shared/pages/Home';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import ProductItem from './products/pages/ProductItem';
import Login from './users/pages/Login';
import Signup from './users/pages/Signup';

import './style.scss'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  ) 
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/product/:pid",
        element: <ProductItem />
      },
      
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}



export default App