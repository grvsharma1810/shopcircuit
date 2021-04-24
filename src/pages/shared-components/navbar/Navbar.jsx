import './navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {     
    
    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "inherit",
    };

    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">ShopCircuit</div>
                </div>
                <div className="nav-links">
                    <ul>                        
                        <NavLink to="/cart" end style={linkStyle} activeClassName="selected">
                            <button className="btn-solid"><i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                        </NavLink>
                        <NavLink to="/wishlist" style={linkStyle} activeClassName="selected">
                            <button className="btn-solid"><i className="fa fa-heart" aria-hidden="true"></i></button>
                        </NavLink>
                    </ul>
                </div>                
            </nav>
        </>
    )
}

export default Navbar;