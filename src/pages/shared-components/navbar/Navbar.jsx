import "./navbar.css";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useData } from "../../../providers/DataProvider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = ({ openSidebar }) => {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();
    const { dataState } = useData();
    const location = useLocation();
    const pathName = location.pathname;
    let productPath = /\/products\/[A-Za-z0-9]*/;
    console.log(location);

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
    };

    return (
        <>
            <nav className="navbar bg-primary">
                {!productPath.test(pathName) && (
                    <div className="brand">
                        <button
                            onClick={openSidebar}
                            className="btn-solid"
                        >
                            <MenuIcon />
                        </button>
                        <img
                            onClick={() => navigate("/")}
                            className="brand-img mr-sm"
                            src={logo}
                            alt="SHOPCIRCUIT"
                            style={{ width: "2.5rem", height: "2.5rem" }}
                        />
                        <div
                            onClick={() => navigate("/")}
                            className="brand-title"
                            style={{ fontSize: "1.25rem" }}
                        >
                            ShopCircuit
                        </div>
                    </div>
                )}
                {productPath.test(pathName) && (
                    <div
                        onClick={() => navigate("/products")}
                        className="brand"
                    >
                        <ArrowBackIcon />
                    </div>
                )}
                <div className="nav-links">
                    <ul>
                        {loggedInUser ? (
                            <>
                                <NavLink to="/cart" end style={linkStyle}>
                                    <button className="btn-solid">
                                        <ShoppingCartIcon />
                                        <span class="badge bg-red-600">
                                            {dataState.cart.length}
                                        </span>
                                    </button>
                                </NavLink>
                                <NavLink to="/wishlist" style={linkStyle}>
                                    <button className="btn-solid">
                                        <FavoriteIcon />
                                        <span class="badge bg-red-600">
                                            {dataState.wishlist.length}
                                        </span>
                                    </button>
                                </NavLink>
                            </>
                        ) : (
                            <button
                                className="btn-solid"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
