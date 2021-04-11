import { Navigate,useNavigate } from "react-router"
import { useAuth } from "../../Context/AuthContext";
import "./Login.css"

export const SignUp = () => {
    const {auth,authDispatch} = useAuth();
    const {userDetails} = auth;
    const navigate = useNavigate();
    // console.log(auth);
    const onChangeHandler = (fieldName,fieldValue) => {
        
        authDispatch({type:"MANAGE_SIGNINDETAILS",payload:fieldName,value:fieldValue})
    }
    const signUpHandler = () => {
        authDispatch({type:"SIGNUP_HANDLER"});
        authDispatch({type:"SET_ISLOGGEDIN"});
        console.log(auth);
        
    }
    if(auth.isLoggedIn){
        navigate("/");
    }
    return <div className = "login-container">
        <h1 className = "purple-txt">Sign Up</h1>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "firstName" 
            placeholder = "first name"
            value = {userDetails.firstName}
            onChange = {(e) => onChangeHandler(e.target.name,e.target.value)}/>
 	       {userDetails.error.firstName && <small>*{userDetails.error.firstName}</small>}
        </div>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "lastName" 
            placeholder = "last name"
            value = {userDetails.lastName}
            onChange = {(e) => onChangeHandler(e.target.name,e.target.value)}/>
 	     
        </div>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "email" 
            placeholder = "email"
            value = {userDetails.email}
            onChange = {(e) => onChangeHandler(e.target.name,e.target.value)}/>
 	        {userDetails.error.email && <small>*{userDetails.error.email}</small>}
        </div>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "password" 
            placeholder = "password"
            value = {userDetails.password}
            onChange = {(e) => onChangeHandler(e.target.name,e.target.value)}/>
 	        {userDetails.error.password && <small>*{userDetails.error.password}</small>}
 	        
        </div>
        <div className = "login-btn__container">
            <button className = "btn btn-primary" onClick = {signUpHandler}>Create an account</button>

        </div>
    </div>
}