import './sign-up.css'
import {useAuth} from '../../providerss/AuthProvider'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    
    const {signup,isLoading} = useAuth();    
    const navigate = useNavigate();    
    
    const formSubmit = async(event) => {         
        event.preventDefault()
        event.stopPropagation()
        if(!event.target.checkValidity()){                
            event.target.classList.add('was-validated')
        }
        else{
            const name = event.target[0].value            
            const email = event.target[1].value;
            const password = event.target[2].value;
            signup({name,email,password});
        }        
    }

    return (
        <div className="flex h-center">
            <form className="form needs-validation" noValidate onSubmit={(event) => formSubmit(event)}> 
                <div className="form-row">
                    <p className="form-field">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" placeholder="Name" name="name" required/>  
                        <span className="error-msg">Please enter valid name</span>
                        <span className="success-msg">Looks Good</span>
                    </p>                     
                </div>                   
                <div className="form-row">
                    <p className="form-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Email" name="email" required/>  
                        <span className="error-msg">Please enter valid email</span>
                        <span className="success-msg">Looks Good</span>
                    </p>                     
                </div>   
                <div className="form-row">              
                    <p className="form-field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" autoComplete="true" required/>
                        <span className="error-msg">Please enter valid password</span>
                        <span className="success-msg">Looks Good</span>
                    </p>
                </div>                           
                <div>
                    {!isLoading && <button className="btn-solid primary">Sign Up</button>}
                    {isLoading && <button className="btn-solid secondary">Signing Up...</button>}
                    <button 
                    type="button"
                    onClick={() => navigate("/login")}
                    className="btn-link primary">Already have an account ? Log In</button> 
                </div>                                                             
            </form>                                    
        </div>
    )
}

export default SignUp