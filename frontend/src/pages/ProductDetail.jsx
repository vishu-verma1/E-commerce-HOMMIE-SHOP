import React from 'react'
import HeaderComponent from '../components/header-footer/HeaderComponent'
import ProductDetailComponent from '../components/Products/ProductDetailComponent'
import NavbarHeader from '../components/header-footer/NavbarHeader'
import { useSelector } from 'react-redux'




const ProductDetail = () => {
  return (
    <div>   
        <NavbarHeader/>
        <ProductDetailComponent/>
    </div>
  )
}

export default ProductDetail