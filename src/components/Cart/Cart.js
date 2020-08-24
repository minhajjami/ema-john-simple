import React from 'react';

const Cart = (props) => {
    const cart=props.cart;
    //const total = cart.reduce((total,prd)=>total+prd.price,0)

    let total=0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+product.price;
    }

    let shippingCharge = 0;
    if(total>35){
        shippingCharge = 0;
    }
    else if(total>15){
        shippingCharge=4.99;
    }
    else if(total>0){
        shippingCharge=12.99;
    }

    const tax=(total/10).toFixed(2);
    const grandTotal=(total+shippingCharge+Number(tax)).toFixed(2);

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Oredered : {cart.length} </p>
            <p>Product Price : {total}</p>
            <p><small>Shipping Cost : {shippingCharge}</small></p>
            <p><small>Tax+Vat : {tax}</small></p>
            <p>Total Price : {grandTotal}</p>
        </div>
    );
};

export default Cart;