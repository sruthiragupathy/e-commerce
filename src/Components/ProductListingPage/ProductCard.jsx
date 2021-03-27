import React from "react";
import "./ProductCard.css";

export const ProductCard = ({product}) => {
    const {id,image,brandName,description,price,isnew,sale,outOfStock,discountByPercentage,count,type} = product;
    const calculateOriginalPrice = (price,discountByPercentage) => {
        return Math.floor(discountByPercentage/100 * price) + Number(price);
    }
    const getTrimmedDescription = (description) => {
        return description.length > 20 ? description.slice(0,21)+"..." : description
    }
    return (
        <div className="card pointer" key = {id} >
                        <img className="responsive-img" src={image} alt={brandName}/>
                        {isnew && <span className = "card__badge">NEW</span>}
                        {!isnew && discountByPercentage !== 0 && <span className = "card__badge">SALE</span>}
                        <div className="card__description">
                            <div className="primary">
                                <h4 className="brand-name rm">{brandName}</h4>
                                <small className="light">{getTrimmedDescription(description)}</small>
                                <div className="price">
                                    <h5 className = "rm"><strong>Rs. {price.split(".")[0]} </strong></h5>
                                    {discountByPercentage !== 0 && <h5 className="rm light strikethrough">Rs. {calculateOriginalPrice(price,discountByPercentage)} </h5>}
                                    {discountByPercentage !== 0 && <h5 className="rm discount">({discountByPercentage}% OFF)</h5>}
                                </div>
                                {count <= 5 &&
                                        <div className = "secondary">
                                            <span className="orange-txt"><strong>Only few left!</strong></span>
                                </div>}
                                <button className = "btn btn-primary">Add to Cart</button>
                            </div>
                            <button className = "btn-icon btn-social-engagement wishlist wishlist-purple">
                                <i className="fa fa-heart"></i>
                            </button>
                        </div>
                    </div>
                
    )
}