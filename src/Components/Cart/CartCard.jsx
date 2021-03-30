import "./CartCard.css"

export const CartCard = ({product}) => {
    const {id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage,count,seller} = product;

    return (    
                    <div class="horizontal-card mb">
                        <div class="horizontal-card__cart-item">
                            <div class="cart-item__img">
                                <img class="responsive-img" src={image} alt={brandName}/>
                            </div>
                            <div class="cart-item__flex">
                                <div class="cart-item__details">
                                    <div class="details__primary">
                                        <p class =  "rm"><strong>{brandName}</strong></p>
                                        <div class="light rm">{description}</div>
                                        <small>Sold by: {seller}</small>
                                    </div>
                                    <div class = "details__btns">
                                        <button class="badge primary-badge">Size: S <i class="fa fa-caret-down"></i></button>
                                        <button class="badge primary-badge">Qty: 1 <i class="fa fa-caret-down"></i></button>
                                    </div>
                                </div>
                                <div class="cart-item__price">
                                    <h5 class = "rm"><strong>Rs. {price} </strong></h5>
                                    <span class="rm light strikethrough">Rs.1400 </span>
                                    <span class = "price__discount">({discountByPercentage} OFF)</span>
                                </div>
                            </div>
                        </div>
                        <div class="horizontal-card__btns">
                            <div class = "remove-container">
                                <button class = "remove">REMOVE</button>
                            </div>
                            <div>
                                <button class = "move-to-wishlist">MOVE TO WISHLIST</button>
        
                            </div>
                        </div>
                    </div>
    )
}