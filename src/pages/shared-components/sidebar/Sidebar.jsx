import "./sidebar.css";
import { forwardRef, useEffect, useRef } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LanguageIcon from "@material-ui/icons/Language";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";

const ListItem = ({ icon, title }) => {
    return (
        <li
            style={{ display: "flex", alignItems: "center" }}
            class="list-item list-item-action p-1 flex-gap-1"
        >
            {icon}
            <div class="text-heading-medium">{title}</div>
        </li>
    );
};

const Sidebar = ({ closeSidebar, openSidebar, backdropRef, sidebarRef }) => {
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
                    <ul class="list-group">
                        <ListItem
                            icon={<AccountCircleIcon />}
                            title="My Account"
                        />
                        <ListItem
                            icon={<LanguageIcon />}
                            title="Chose Language"
                        />
                        <ListItem icon={<ShoppingCartIcon />} title="My Cart" />
                        <ListItem icon={<FavoriteIcon />} title="My Wishlist" />
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
