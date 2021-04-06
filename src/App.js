import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Cart from './pages/cart/cart';
import Navbar from './pages/navbar/navbar';
import Products from './pages/products/products';
import Wishlist from './pages/wishlist/wishlist';

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
