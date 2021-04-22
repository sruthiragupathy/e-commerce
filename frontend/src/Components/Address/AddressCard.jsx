import { BACKEND } from "../../api";
import { useAuth } from "../../Context/AuthContext"
import { useProduct } from "../../Context/ProductContext";
import { RestApiCalls } from "../../utils/CallRestApi"


export const AddressCard = ({address, addressState, setAddressState, setOpenForm, setEditAddress, openForm}) => {
    const { auth } = useAuth();
    const { dispatch } = useProduct();
    
    const removeAddressHandler = async () => {
        const { response, success } = await RestApiCalls("DELETE",`${BACKEND}/${auth.user._id}/address/${address._id}`) 
        if(success){
            dispatch({type: "SET_ADDRESS", payload: response.addresses})
        }
    }
    const editAddressHandler = () => {
        setOpenForm( prev => true )
        setAddressState (prev => ({
            name: address.name,
            mobile_number: address.mobileNumber,
            pin_code: address.pinCode,
            address: address.address,
            town: address.town,
            state: address.state
        }))
        setEditAddress(prev => address._id)
    }
    return <div className = "address-card">
        <input type = "radio" name = "address" checked></input>
        <div className = "address-details">
            <div className = "bold-txt">{address.name}</div>
            <div>{address.address}, {address.town}, {address.state} - {address.pinCode}</div>
            <div>Mobile <span className = "bold-txt">{address.mobileNumber}</span></div>
            <div>Cash on Delivery available</div>
            <div>
                <button className = "btn btn-outline-danger  remove-btn" onClick  = {removeAddressHandler} >REMOVE</button>
                <button className = "btn btn-outline-secondary" onClick = {editAddressHandler} >EDIT</button>
            </div>

            
        </div>

    </div>
}