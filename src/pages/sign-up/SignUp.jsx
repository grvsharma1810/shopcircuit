import "./sign-up.css";
import {getLanguageLabel} from "../../utils/getLanguageLabel"
import {useLocalisation} from "../../providers/LocalisationProvider"
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const {localisationState:{ languageIndex }} = useLocalisation();
    const { signup, isLoading } = useAuth();
    const navigate = useNavigate();

    const formSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.classList.add("was-validated");
        } else {
            const name = event.target[0].value;
            const email = event.target[1].value;
            const password = event.target[2].value;
            signup({ name, email, password });
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
                            <label htmlFor="name">{getLanguageLabel("name",languageIndex)}</label>
                            <input
                                id="name"
                                type="text"
                                placeholder={getLanguageLabel("name",languageIndex)}
                                name="name"
                                required
                            />
                            <span className="error-msg">
                                {getLanguageLabel("please_enter_valid_name",languageIndex)}
                            </span>
                            <span className="success-msg">{getLanguageLabel("valid",languageIndex)}</span>
                        </p>
                    </div>
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
                            <button className="btn-solid primary">
                                {getLanguageLabel("sign_up",languageIndex)}
                            </button>
                        )}
                        {isLoading && (
                            <button className="btn-solid secondary">
                                {getLanguageLabel("signing_up",languageIndex)}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <div className="login-box text-center">
                <p className="mb-1">{getLanguageLabel("already_have_an_account",languageIndex)} ?</p>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="btn-solid secondary w-100"
                >
                    {getLanguageLabel("login",languageIndex)}
                </button>
            </div>
        </>
    );
};

export default SignUp;
