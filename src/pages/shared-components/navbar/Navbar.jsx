import "./navbar.css";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";
import { useData } from "../../../providers/DataProvider";

const Navbar = () => {
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
                    <div onClick={() => navigate("/")} className="brand">
                        <img
                            className="brand-img mr-sm"
                            src={logo}
                            alt="SHOPCIRCUIT"
                        />
                        <div
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
                        className="brand ml-sm"
                    >
                        <i
                            class="fa fa-arrow-left text-size-2"
                            aria-hidden="true"
                        ></i>
                    </div>
                )}
                <div className="nav-links">
                    <ul>
                        {loggedInUser && (
                            <>
                                <NavLink to="/cart" end style={linkStyle}>
                                    <button className="btn-solid">
                                        <i
                                            className="fa fa-shopping-cart"
                                            aria-hidden="true"
                                        ></i>
                                        <span class="badge bg-red-600">
                                            {dataState.cart.length}
                                        </span>
                                    </button>
                                </NavLink>
                                <NavLink to="/wishlist" style={linkStyle}>
                                    <button className="btn-solid">
                                        <i
                                            className="fa fa-heart"
                                            aria-hidden="true"
                                        ></i>
                                        <span class="badge bg-red-600">
                                            {dataState.wishlist.length}
                                        </span>
                                    </button>
                                </NavLink>
                                <NavLink to="/account" style={linkStyle}>
                                    <button className="btn-solid">
                                        <i
                                            class="fa fa-user-circle"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </NavLink>
                            </>
                        )}
                        {!loggedInUser && (
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
