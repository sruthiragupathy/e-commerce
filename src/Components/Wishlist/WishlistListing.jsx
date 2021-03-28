import { useProduct } from "../../Context/ProductContext"
import { WishlistCard } from "./WishlistCard";
import "./WishlistListing.css";


export const WishlistListing = () => {
    const {state,dispatch} = useProduct();
    return(
        <div>
                {state.wishlist.length === 0 ? 
                <div className = "empty-product">"Your Wishlist is empty"</div> :
                <div className = "container">
                <div className = "wishlist-heading"><strong>My Wishlist</strong> - {state.wishlist.length} items</div>
                <div class = "wishlist-wrapper">
                {
                    state.wishlist.map(product => <WishlistCard product = {product}/>)
                }
                </div>
                </div>}
        </div>

    )
}