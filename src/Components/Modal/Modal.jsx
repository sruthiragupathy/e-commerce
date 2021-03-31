import { useProduct } from "../../Context/ProductContext"
import "./Modal.css"

export const Modal = ({product}) => {
    const {dispatch} = useProduct();
    const removeHandler = () => {
        dispatch({type: "SET_OVERLAY"});
        dispatch({type: "REMOVE_FROM_CART",payload:product})
    }
    const cancelHandler = () => {
        dispatch({type: "SET_OVERLAY"})

    }
    return (
        <div class="modal-container">
	        <h2 class = "rm">Remove Item</h2>
            <p>Are you sure you want to remove this item?</p>
            <div class="modal__btns">
    	        <button class="btn btn-outline-secondary" onClick = {cancelHandler}>Cancel</button>
                <button class="btn btn-danger" onClick  = {removeHandler}>Remove</button>
            </div>
        </div>
            
        )}