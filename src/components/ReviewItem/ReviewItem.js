import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}=props.product;
    const reviewItemStyle={
        borderBottom:'1px solid lightgrey',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    return (
        <div style={reviewItemStyle}>
            <h2  className="product-name">{name}</h2>
            <p>Quantity:{quantity}</p>
            <p>Price:${price}</p>
            <br/>
            <button
                onClick={()=>props.removeProduct(key)}
                className="main-btn">Remove
             </button>
        </div>
    );
};

export default ReviewItem;