import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    const first10 = fakeData.slice(0,10);
    const[products,setProducts]=useState(first10);
    const [cart,setCarts]=useState([]);

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const previousCart=productKeys.map(existingKey=>{
            const product=fakeData.find(pd=>pd.key===existingKey)
            product.quantity=savedCart[existingKey];
            return product;
        })
        setCarts(previousCart);
    },[])
    
    const handleAddProduct = (product) => {

        const toBeAddedkey=product.key;
        const sameProduct= cart.find(pd=>pd.key===toBeAddedkey);

        let count=1;
        let newCart;

        if(sameProduct){
            count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAddedkey);
            newCart=[...others,sameProduct];
        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }

        setCarts(newCart);
        addToDatabaseCart(product.key,count);
        // const newCart=[...cart,product];
        // setCarts(newCart);
        // const sameProduct = newCart.filter(pd=>pd.key===product.key);
        // const count=sameProduct.length;
        // addToDatabaseCart(product.key,count);

    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                     products.map(pd => <Product 
                     key={pd.key}
                     showAddToCart={true}
                     addProduct={handleAddProduct}
                     product={pd}>{pd.name}
                     </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button class="main-btn">Review Order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;