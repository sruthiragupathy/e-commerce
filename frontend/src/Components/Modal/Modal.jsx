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
        <div className="modal-container">
	        <h2 className = "rm">Remove Item</h2>
            <p>Are you sure you want to remove this item?</p>
            <div className="modal__btns">
    	        <button className="btn btn-outline-secondary" onClick = {cancelHandler}>Cancel</button>
                <button className="btn btn-danger" onClick  = {removeHandler}>Remove</button>
            </div>
        </div>
            
        )}