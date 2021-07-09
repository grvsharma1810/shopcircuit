import './App.css';
import { useRef } from "react"
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import Navbar from './pages/shared-components/navbar/Navbar';
import Products from './pages/products/Products';
import Wishlist from './pages/wishlist/Wishlist';
import Signup from './pages/sign-up/SignUp'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import ViewProduct from './pages/view-product/ViewProduct'
import MyAccount from './pages/my-account/MyAccount'
import PageNotFound from './pages/page-not-found/PageNotFound'
import PrivateRoute from './pages/shared-components/PrivateRoute'
import Spinner from './pages/shared-components/spinner/Spinner';

import { useData } from './providers/DataProvider'
import Sidebar from './pages/shared-components/sidebar/Sidebar';

function App() {
  const backdropRef = useRef(null);
  const sidebarRef = useRef(null);
  const { isInitialAppDataLoading, dataState } = useData();
  console.log({ dataState });

  const closeSidebar = (event) => {
    event.stopPropagation();
    sidebarRef.current.style.left = "-100%";
    backdropRef.current.style.visibility = "hidden";
  };

  const openSidebar = (event) => {
    event.stopPropagation();
    backdropRef.current.style.visibility = "visible";
    sidebarRef.current.style.left = "0";
  };

  return (
    <>
      {isInitialAppDataLoading && <Spinner description="Loading Products.." />}
      {
        !isInitialAppDataLoading &&
        <div className="App">
          <Navbar openSidebar={openSidebar} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ViewProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <PrivateRoute path="/cart" element={<Cart />} />
            <PrivateRoute path="/wishlist" element={<Wishlist />} />
            <PrivateRoute path="/account" element={<MyAccount />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      }
      <Sidebar closeSidebar={closeSidebar} sidebarRef={sidebarRef} backdropRef={backdropRef} />
    </>
  );
}

export default App;
