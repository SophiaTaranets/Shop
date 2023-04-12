import React from 'react';
import ProductItem from './ProductItem/ProductItem';
import './ProductList.css';
import {ARI_URL, SUCCESS_CODE, ERROR_CODE} from '../../constants'
import axios from 'axios';

export default function ProductList({ products, setUserMessage }) {

    const addToCart = (id, amount) =>  {
    
        const cartData = {
            amount: amount,
            products: [id],
            status: "active"
            
        }
        
        axios.post(`${ARI_URL}/shoppingcart/`, cartData)
            .then(function (response) {
                setUserMessage({message: "Product was successfully added to cart", code: SUCCESS_CODE})
                
            })
            .catch(function (error) {
                console.log(error);
                setUserMessage({message: "Something went wrong!", code: ERROR_CODE})

            });
      
    }


   


    return (
        <div className="productListContainer">
            <h2>Products</h2>
            {products &&
                products.map((product) => {
                    return (
                        <ProductItem
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            onAddToCart={addToCart}
                            id={product.id}
                         
                            
                        />
                    );
                })}
        </div>
    );
}
