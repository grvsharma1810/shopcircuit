import "./sidebar.css";
import { useEffect, useRef } from "react";

const Sidebar = ({}) => {
    const backdropRef = useRef(null);
    const sidebarRef = useRef(null);

    const handleClose = (event) => {
        event.stopPropagation();
        sidebarRef.current.style.left = "-100%";
        backdropRef.current.style.visibility = "hidden";
    };

    useEffect(() => {
        // sidebarRef.current.pointerEvents = "none";
    });

    return (
        <>
            <div
                onClick={(event) => handleClose(event)}
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
                    <span
                        onClick={() => {
                            console.log("SPAN CLICK");
                        }}
                    >
                        lsjkdfhsdjf
                    </span>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
