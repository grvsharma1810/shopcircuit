import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Cart from './pages/cart/Cart';
import Navbar from './pages/navbar/Navbar';
import Products from './pages/products/Products';
import Wishlist from './pages/wishlist/Wishlist';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/wishlist" exact component={Wishlist} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
