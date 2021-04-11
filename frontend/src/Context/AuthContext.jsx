
import { createContext, useContext, useEffect, useReducer } from "react";
import {Navigate,useNavigate} from "react-router-dom";
import { fakeAuthApi } from "./fakeAuthApi";
import { useProduct } from "./ProductContext";
const AuthContext = createContext();

const authReducer = (auth,{type,payload,value}) => {
    switch(type){
        case "SET_DATABASE":
            return {...auth, database:[
                ...auth.database, {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password,
                }
            ]}
        case "SET_ISLOGGEDIN":
            return {...auth, isLoggedIn:payload}
        case "SET_CURRENTUSER":
            return {...auth, currentUser:payload}
        case "SET_LOADING":
            return {...auth, loading:!auth.loading}
        default:
            return auth;

    }

}

export const getNameFromEmail = (email) => {
    return email.split("@")[0];
}

export const AuthProvider = ({children}) => {
    const [auth, authDispatch] = useReducer(authReducer,{
        isLoggedIn : false,
        database : [
            {
            "email":"sruthi@gmail.com",
            "password":"sruthi"
            }
        ],
        currentUser : "",
        loading : false
    });
    useEffect(() => {
        const userCredentials = JSON.parse(localStorage?.getItem("logincredentials"))
        // console.log(userCredentials.userName,userCredentials.isUserLoggedIn);
        userCredentials?.isUserLoggedIn && 
        authDispatch({type:"SET_ISLOGGEDIN",payload:userCredentials.isUserLoggedIn})
        userCredentials?.userName &&
        authDispatch({type:"SET_CURRENTUSER" ,payload:userCredentials.userName}) 
    },[])
    const navigate = useNavigate();
 
    const LoginUserWithCredentials = async(email,password,pathTo) => {
        authDispatch({type:"SET_ERROR_FROM_BACKEND",payload:""})

        try{
            const response = await fakeAuthApi(email,password,auth.database)
            if(response?.success){
                localStorage.setItem("logincredentials",
                JSON.stringify({isUserLoggedIn:true, userName: getNameFromEmail(email) }))
                authDispatch({type:"SET_ISLOGGEDIN" ,payload:true})
                authDispatch({type:"SET_CURRENTUSER",payload:getNameFromEmail(email)})
                navigate(pathTo,{replace:pathTo})
                return response
            }
        }
        catch(err){
            return err;

        }
    }

    const logoutHandler = () => {
        authDispatch({type:"SET_LOADING"})
        setTimeout(() => {
            localStorage?.removeItem("logincredentials")
            authDispatch({type:"SET_ISLOGGEDIN",payload:false})
            authDispatch({type:"SET_LOADING"})
            navigate("/");

        },2000)
    }
    return (
        <AuthContext.Provider value = {{auth,authDispatch,LoginUserWithCredentials, logoutHandler}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}