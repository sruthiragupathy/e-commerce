import React from "react";
import "./AddressForm.css"


export const AddressForm = () => {
    return <div className = "form-container">
        <h5>CONTACT DETAILS</h5>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">Name</label>
        </div>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">Mobile No</label>
        </div>
        <h5>CONTACT DETAILS</h5>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">Pin Code</label>
        </div>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">Address (House No, Building Street)</label>
        </div>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">Locality/Town</label>
        </div>
        <div class="input-group">
	        <input type="text" class = "input-area"/>
 	        <label for="email">State</label>
        </div>

        <button className = "btn btn-primary" >ADD ADDRESS</button>

        
    </div>
}