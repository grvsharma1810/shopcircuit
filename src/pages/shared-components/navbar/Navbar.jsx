import './navbar.css'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../providers/AuthProvider'
import {useData} from '../../../providers/DataProvider'

const Navbar = () => {     

    const navigate = useNavigate();
    const {loggedInUser} = useAuth();    
    const {dataState} = useData();
    
    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        backgroundColor: "inherit",
    };

    return (
        <>
            <nav className="navbar bg-primary">
                <div className="brand">
                    <div onClick={() => navigate("/")}
                    className="brand-title text-size-2">ShopCircuit</div>
                </div>
                <div className="nav-links">
                    <ul>                   
                        {
                            !loggedInUser &&
                            <button className="btn-solid bg-yellow-600"
                            onClick={() => navigate('/login')}>Log In</button> 
                        }     
                        {
                            loggedInUser &&
                            <>
                                <NavLink to="/cart" end style={linkStyle} activeClassName="selected">
                                    <button className="btn-solid">
                                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        <span class="badge bg-red-600">{dataState.cart.length}</span>
                                    </button>
                                </NavLink>
                                <NavLink to="/wishlist" style={linkStyle} activeClassName="selected">
                                    <button className="btn-solid">
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                        <span class="badge bg-red-600">{dataState.wishlist.length}</span>
                                    </button>
                                </NavLink>
                            </>
                        }
                    </ul>
                </div>                
            </nav>
        </>
    )
}

export default Navbar;