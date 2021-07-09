import "./sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LanguageIcon from "@material-ui/icons/Language";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AppsIcon from '@material-ui/icons/Apps';
import { useLocalisation } from "../../../providers/LocalisationProvider";
import { languageList } from "../../../data/language-data";
import { getLanguageLabel } from "../../../utils/getLanguageLabel";
import { SET_LANGUAGE_INDEX } from "../../../reducers/localisation-reducer";

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
    const {
        localisationState: { languageIndex },
        localisationDispatch,
    } = useLocalisation();

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
                        title={getLanguageLabel("my_account", languageIndex)}
                    />
                    <ListItem
                        icon={<LanguageIcon />}
                        title="Chose Language"
                        active={true}
                    >
                        {languageList[languageIndex].map(
                            (language, index) => {
                                return (
                                    <SubListItem
                                        key={index}
                                        onClick={(event) => {
                                            localisationDispatch({
                                                type: SET_LANGUAGE_INDEX,
                                                payload: {
                                                    languageIndex: index,
                                                },
                                            });
                                            closeSidebar(event);
                                        }}
                                    >
                                        {language}
                                    </SubListItem>
                                );
                            }
                        )}
                    </ListItem>
                    <ListItem
                        onClick={(event) => {
                            navigate("/cart");
                            closeSidebar(event);
                        }}
                        icon={<ShoppingCartIcon />}
                        title={getLanguageLabel("my_cart", languageIndex)}
                    />
                    <ListItem
                        onClick={(event) => {
                            navigate("/wishlist");
                            closeSidebar(event);
                        }}
                        icon={<FavoriteIcon />}
                        title={getLanguageLabel("my_wishlist", languageIndex)}
                    />
                    <ListItem
                        onClick={(event) => {
                            navigate("/products");
                            closeSidebar(event);
                        }}
                        icon={<AppsIcon />}
                        title={getLanguageLabel("all_products", languageIndex)}
                    />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
