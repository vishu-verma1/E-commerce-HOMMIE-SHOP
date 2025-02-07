import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import CardComponent from "./components/Products/CardComponent";
import NavbarHeader from "./components/header-footer/NavbarHeader";
import HeaderComponent from "./components/header-footer/HeaderComponent";
import ProductDetail from "./pages/ProductDetail";
import OrderdComponent from "./components/order/orderdComponent";
import UserProfileCard from "./components/user/UserProfileCard";
import UserProfileComponent from "./components/profileComponents/UserProfileComponent";
import Account from "./pages/Account";
import OrderListComponent from "./components/profileComponents/OrderListComponent";
import CartListComponent from "./components/profileComponents/CartListComponent";
import AccountSettingComponent from "./components/profileComponents/AccountSettingComponent";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/product-detail" element={<ProtectedRoute>
          <ProductDetail/>
        </ProtectedRoute>}/>
        
       
        <Route path="/order-complete" element={<ProtectedRoute>
          <OrderdComponent/>
        </ProtectedRoute>}/>

        <Route path="/profile" element={<ProtectedRoute><Account/></ProtectedRoute>}/>

        {/* <Route path="/" element={<AccountSettingComponent/>}/> */}

      </Routes>
    </>
  );
}

export default App;
