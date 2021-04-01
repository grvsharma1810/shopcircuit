import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Cart from './components/cart/cart';
import Navbar from './components/navbar/navbar';
import Products from './components/products/products';
import Wishlist from './components/wishlist/wishlist';

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
