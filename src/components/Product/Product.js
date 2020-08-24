import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    //console.log(props);
    const { img, name, seller, stock, price } = props.product;

    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order Soon</small></p>
                <button 
                className="main-btn"
                onClick={()=>props.addProduct(props.product)}
                > 
                <FontAwesomeIcon icon={faShoppingCart}/> Add to cart
                </button>
            </div>

        </div>
    );
};

export default Product;