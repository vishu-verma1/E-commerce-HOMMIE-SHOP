import { lazy, Suspense, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
import ProtectedRoute from "./utils/ProtectedRoute";
import ProductDetail from "./pages/ProductDetail";
import OrderdComponent from "./components/order/orderdComponent";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Suspense fallback={<>Loading....</>}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/product-detail" element={<ProtectedRoute>
          <ProductDetail />
        </ProtectedRoute>} />


        <Route path="/order-complete" element={<ProtectedRoute>
          <OrderdComponent />
        </ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><Account /></ProtectedRoute>} />

        {/* <Route path="/" element={<WishListComponent/>}/> */}

      </Routes>
    </>
  );
}

export default App;
