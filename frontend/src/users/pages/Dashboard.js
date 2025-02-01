import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Link to="/product/new">
      Add Product
    </Link>
    <Link to="/product/new">
      My Products
    </Link>
  </>
  )
}

export default Dashboard