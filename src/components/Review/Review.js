import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const[cart,setCart]=useState([]);
    const[orderPlaced,setOrderPlaced]=useState(false);

    const removeProduct=(productKey)=>{
        const newCart=cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);   
    }

    const history=useHistory()

    const handleProceedCheckout=()=>{
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();

        history.push('/shipment');
        
    }
    
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key)
            product.quantity=savedCart[key];
            return product;
        });
        setCart(cartProducts);

    },[]);

    let thankYou;
    if(orderPlaced){
       thankYou = <img src={happyImage} alt="order placed"/>
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                cart.map(pd=><ReviewItem 
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
            }
            {
                thankYou
            }
            </div>  
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                     onClick={handleProceedCheckout}
                     className="main-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;