import './App.css';

import { Routes, Route } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import Navbar from './pages/shared-components/navbar/Navbar';
import Products from './pages/products/Products';
import Wishlist from './pages/wishlist/Wishlist';
import Signup from './pages/sign-up/SignUp'
import Login from './pages/login/Login'
import PrivateRoute from './pages/shared-components/PrivateRoute'
import Spinner from './pages/shared-components/spinner/Spinner';

import { useData } from './providers/DataProvider'

function App() {

  const { isInitialAppDataLoading, dataState } = useData();
  console.log({ dataState });

  return (
    <>
      {isInitialAppDataLoading && <Spinner description="Loading Products.." />}
      {
        !isInitialAppDataLoading &&
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <PrivateRoute path="/cart" element={<Cart />} />
            <PrivateRoute path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      }
    </>
  );
}

export default App;
