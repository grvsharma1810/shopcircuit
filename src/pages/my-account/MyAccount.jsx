import "./my-account.css";
import maleAvatar from "./male-avatar.svg";
import { useAuth } from "../../providers/AuthProvider";

const MyAccount = () => {
    const { loggedInUser, signOut } = useAuth();
    return (
        <>
            <div className="box flex flex-column v-center">
                <div class="avatar-wrapper">
                    <img
                        className="avatar"
                        style={{ width: "5rem", height: "5rem" }}
                        src={maleAvatar}
                        alt="Avatar"
                    />
                </div>
                <div className="text-size-3 text-center">
                    {loggedInUser.name}
                </div>
                <div>{loggedInUser.email}</div>
                <button
                    onClick={() => signOut()}
                    className="btn-solid primary mt-1"
                >
                    Log Out
                </button>
            </div>
        </>
    );
};

export default MyAccount;
