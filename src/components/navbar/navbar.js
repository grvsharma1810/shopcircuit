import './navbar.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const Navbar = () => {

    const navRef = useRef(null);

    const toggleNav = () => {
        console.log("TOGGGLEE");
        navRef.current.classList.toggle('active')
    }

    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div className="brand-title text-size-2">ShopCircuit</div>
                </div>
                <div className="nav-links" ref={navRef}>
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
                <div className="toggle"                    
                    onClick={() => toggleNav()}
                ><i className="fa fa-bars"></i></div>
            </nav>
        </>
    )
}

export default Navbar;