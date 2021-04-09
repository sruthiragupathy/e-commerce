import { useState } from "react";
import { Navigate,useLocation,useNavigate } from "react-router"
import { useAuth,getNameFromEmail } from "../../Context/AuthContext";
import { useProduct } from "../../Context/ProductContext";


import "./Login.css"

const isValidEmail = (email) => {
    const emailRegex = new RegExp("[a-z][0-9]*@gmail.com");
    return emailRegex.test(email);
}

export const SignUp = () => {
    const {auth, authDispatch} = useAuth();
    const {state, dispatch} = useProduct();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const location = useLocation();
    const [error,setError] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })
    const [loading, setLoading] = useState(false);
   const onChangeHandler = (e) => {
       setUser({...user,[e.target.name]:e.target.value})
   }
   const validateForm = () => {
       setError({firstName:"",
       lastName:"",
       email:"",
       password:""})
       let validationSuccess = true;
       if(!user.firstName){
           setError(error => ({...error,firstName:"Please Enter a valid name"}))
           validationSuccess = false;
       }
       if(!user.email || !isValidEmail(user.email)){
        setError(error => ({...error,email:"Please Enter a valid email"}))
        validationSuccess = false;

        }
        if(!user.password){
        setError(error => ({...error,password:"Please Enter a valid password"}))
        validationSuccess = false;

        }
        return validationSuccess;
   }
   const hideToast = () => {
    setTimeout(() => {
        dispatch({type:"TOGGLE_TOAST",payload:""});
      }, 3000)
}
    const signUpHandler = (from) => {
        setLoading(true)
        setTimeout(() => {
            if(validateForm()){
                authDispatch({type:"SET_DATABASE" , payload:user});
                authDispatch({type:"SET_ISLOGGEDIN" , payload:true});
                authDispatch({type:"SET_CURRENTUSER",payload:getNameFromEmail(user.email)})
                localStorage.setItem("logincredentials",
                JSON.stringify({isUserLoggedIn:true, userName: getNameFromEmail(user.firstName) }))
                navigate(from)
                dispatch({type:"TOGGLE_TOAST",payload:"You have been signed up successfully, Happy Shopping"});
                hideToast()
            }
            setLoading(false)

        },2000)
        
        
    }

    return <div className = "login-container">
        <h1 className = "rm purple-txt login-title">Create an account</h1>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "firstName" 
            placeholder = "first name"
            value = {user.firstName}
            onChange = {onChangeHandler}/>
 	       {error.firstName && <small className = "red-txt">*{error.firstName}</small>}
        </div>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "lastName" 
            placeholder = "last name"
            value = {user.lastName}
            onChange = {onChangeHandler}/>
 	     
        </div>
        <div class="input-group">
	        <input 
            type="text" 
            class = "input-area" 
            name = "email" 
            placeholder = "email : johndoe@gmail.com"
            value = {user.email}
            onChange = {onChangeHandler}/>
 	        {error.email && <small className = "red-txt">*{error.email}</small>}
        </div>
        <div class="input-group">
	        <input 
            type="password" 
            class = "input-area" 
            name = "password" 
            placeholder = "password"
            value = {user.password}
            onChange = {onChangeHandler}/>
 	        {error.password && <small className = "red-txt">*{error.password}</small>}
 	        
        </div>
        <div className = "login-btn__container">
            <button className = "btn btn-primary" onClick = {() => signUpHandler(location.state?.from?location.state.from:"/")}>{
            loading?"SIGNING IN.....":"CREATE AN ACCOUNT"}</button>

        </div>
    </div>
}