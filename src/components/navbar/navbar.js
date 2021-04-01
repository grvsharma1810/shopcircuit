import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">ShopCircuit</div>
                </div>
                <div className="nav-links">
                    <ul>
                        <Link to="/">
                            <li><button className="btn-solid primary">Home</button></li>
                        </Link>
                        <Link to="/cart">
                            <li><button className="btn-solid primary"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart</button></li>
                        </Link>
                        <Link to="/wishlist">
                            <li><button className="btn-solid primary"><i className="fa fa-heart" aria-hidden="true"></i> Wishlist</button></li>
                        </Link>
                    </ul>
                </div>
                <div className="toggle"><span className="bars"></span></div>
            </nav>
        </>
    )
}

export default Navbar;