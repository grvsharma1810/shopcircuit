import "./login.css";
import { getLanguageLabel } from "../../utils/getLanguageLabel";
import { useLocalisation } from "../../providers/LocalisationProvider";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();
    const {localisationState:{ languageIndex }} = useLocalisation();

    const formSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.classList.add("was-validated");
        } else {
            const email = event.target[0].value;
            const password = event.target[1].value;
            login(email, password);
        }
    };

    return (
        <>
            <div className="login-box login-form">
                <form
                    className="form needs-validation"
                    noValidate
                    onSubmit={(event) => formSubmit(event)}
                >
                    <div className="form-row">
                        <p className="form-field">
                            <label htmlFor="email">{getLanguageLabel("email",languageIndex)}</label>
                            <input
                                id="email"
                                type="email"
                                placeholder={getLanguageLabel("email",languageIndex)}
                                name="email"
                                required
                            />
                            <span className="error-msg">
                            {getLanguageLabel("please_enter_valid_email",languageIndex)}
                            </span>
                            <span className="success-msg">{getLanguageLabel("valid",languageIndex)}</span>
                        </p>
                    </div>
                    <div className="form-row">
                        <p className="form-field">
                            <label htmlFor="password">{getLanguageLabel("password",languageIndex)}</label>
                            <input
                                id="password"
                                type="password"
                                placeholder={getLanguageLabel("password",languageIndex)}
                                autoComplete="true"
                                required
                            />
                            <span className="error-msg">
                            {getLanguageLabel("please_enter_valid_password",languageIndex)}
                            </span>
                            <span className="success-msg">{getLanguageLabel("valid",languageIndex)}</span>
                        </p>
                    </div>
                    <div>
                        {!isLoading && (
                            <button className="btn-solid primary">{getLanguageLabel("login",languageIndex)}</button>
                        )}
                        {isLoading && (
                            <button className="btn-solid secondary">
                                {getLanguageLabel("validating_inputs",languageIndex)}
                            </button>
                        )}
                        <p className="mt-1" style={{ fontSize: "0.75rem" }}>
                        {getLanguageLabel("privacy_statement",languageIndex)}
                        </p>
                    </div>
                </form>
            </div>
            <div className="login-box text-center">
                <p className="mb-1">{getLanguageLabel("new_to_shopcircuit",languageIndex)} ?</p>
                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="btn-solid secondary w-100"
                >
                    {getLanguageLabel("create_account",languageIndex)}
                </button>
            </div>
        </>
    );
};

export default Login;
