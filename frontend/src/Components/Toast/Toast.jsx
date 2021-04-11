import { useProduct } from "../../Context/ProductContext"
import "./Toast.css"
export const Toast = ({message}) => {
    const {state,dispatch} = useProduct();
    
    return (
        <div className = {`toast ${state.toast.value ? "show-toast" : ""}`}>{message} 
        
        </div>
    )
}