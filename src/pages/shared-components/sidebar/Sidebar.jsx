import "./sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LanguageIcon from "@material-ui/icons/Language";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useLocalisation } from "../../../providers/LocalisationProvider";
import { SET_LANGUAGE } from "../../../reducers/localisation-reducer";

const ListItem = ({ icon, title, children, active = false, ...rest }) => {
    const [subItemActive, setSubItemActive] = useState(active);
    return (
        <>
            <div
                onClick={() => setSubItemActive((value) => !value)}
                style={{ display: "flex", alignItems: "center" }}
                class="list-item-action p-1 flex-gap-1"
                {...rest}
            >
                {icon}
                <div class="text-heading-medium">{title}</div>
            </div>
            {children && subItemActive && <div>{children}</div>}
        </>
    );
};

const SubListItem = ({ children, ...rest }) => {
    return (
        <div
            style={{ padding: "0.25rem 0.25rem 0.25rem 5rem" }}
            class="list-item-action"
            {...rest}
        >
            {children}
        </div>
    );
};

const Sidebar = ({ closeSidebar, backdropRef, sidebarRef }) => {
    const navigate = useNavigate();
    const { localisationState, localisationDispatch } = useLocalisation();
    console.log(localisationState);

    return (
        <>
            <div
                onClick={(event) => closeSidebar(event)}
                className="backdrop"
                ref={backdropRef}
            >
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className="sidebar"
                    ref={sidebarRef}
                >
                    <ListItem
                        onClick={(event) => {
                            navigate("/account");
                            closeSidebar(event);
                        }}
                        icon={<AccountCircleIcon />}
                        title="My Account"
                    />
                    <ListItem
                        icon={<LanguageIcon />}
                        title="Chose Language"
                        active={true}
                    >
                        <SubListItem
                            onClick={(event) => {
                                localisationDispatch({
                                    type: SET_LANGUAGE,
                                    payload: { language: "English" },
                                });
                                closeSidebar(event);
                            }}
                        >
                            English
                        </SubListItem>
                        <SubListItem
                            onClick={(event) => {
                                localisationDispatch({
                                    type: SET_LANGUAGE,
                                    payload: { language: "Hindi" },
                                });
                                closeSidebar(event);
                            }}
                        >
                            Hindi
                        </SubListItem>
                    </ListItem>
                    <ListItem
                        onClick={(event) => {
                            navigate("/cart");
                            closeSidebar(event);
                        }}
                        icon={<ShoppingCartIcon />}
                        title="My Cart"
                    />
                    <ListItem
                        onClick={(event) => {
                            navigate("/wishlist");
                            closeSidebar(event);
                        }}
                        icon={<FavoriteIcon />}
                        title="My Wishlist"
                    />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
