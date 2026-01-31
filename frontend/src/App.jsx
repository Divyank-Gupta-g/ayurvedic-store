import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/common/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/forms/Login";
import ProductCategories from "./pages/ProductCategories";
import ProductDetails from "./pages/ProductDetails";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProduct from "./pages/seller/AddProduct"; 
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";
import Loading from "./components/checkout/Loading";

function App() {

  const isSellerPath = useLocation().pathname.includes('seller');
  const {showUserLogin, isSeller} = useAppContext();

  return (
    <>
      {/* <BrowserRouter> */}
        {isSellerPath ? null : <Navbar />}  
        {showUserLogin ? <Login /> : null}
        <Toaster /> 
        <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32 pb-10'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<ProductCategories />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addAddress" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders/>} />
            <Route path="/loader" element={<Loading/>} />
            {/* <Route path='/seller' element={isSeller ? <SellerDashboard /> : <SellerLogin />} />
              <Route index element={isSeller ? <AddProduct/> : null} />
              <Route path="product-list" element={<ProductList/>} />
              <Route path="orders" element={<Orders/>} /> */}
            <Route path='/seller' element={isSeller ? <SellerDashboard /> : <SellerLogin />}>
              <Route index element={isSeller ? <AddProduct/> : null} />
              <Route path="product-list" element={<ProductList/>} />
              <Route path="orders" element={<Orders/>} />
            </Route>

            {/* <Route path="/checkout" element={<Checkout />} /> */}
          </Routes>
        </div>
        {!isSellerPath && <Footer />}
      {/* </BrowserRouter> */}
    </>
  )
}

export default App;
