import './CartPage.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {ARI_URL, SUCCESS_CODE, ERROR_CODE} from '../../constants'
import axios from 'axios';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function CartPage() {
    const [cartProducts, setCartProducts] = useState([]);
    const [fullPrice, setFullPrice] = useState(0);
    const [userMessage, setUserMessage] = useState("");

    useEffect(() => {
        axios.get(`${ARI_URL}/shoppingcart/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
            .then(function (response) {
                setCartProducts(response.data)
                setFullPrice((response.data.map(obj => obj.products[0].price * obj.amount)).reduce((partialSum, a) => partialSum + parseInt(a), 0))                
            })
            .catch(function (error) {
                console.log(error);
            });
      }, [])

      let constSuma = 0;

    const deleteFromCart = (id) =>  {
        const itemIndex = cartProducts.findIndex(item => item.id === id);
       
        axios.delete(`${ARI_URL}/shoppingcart/${id}/`)
            
            .then(function (response) {
                const updatedCart = [...cartProducts];
                updatedCart.splice(itemIndex, 1);
                setCartProducts(updatedCart);
                setUserMessage({message: "Product was successfully deleted to cart", code: SUCCESS_CODE})
                
            })
            .catch(function (error) {
                setUserMessage({message: "Something went wrong!", code: ERROR_CODE})

            });
      
    }


    return (
        <div className="cartContainer">
             <div>
                    {userMessage &&
                        <AlertMessage setMessage={setUserMessage} message={userMessage.message} code={userMessage.code}/>
                    }
            </div>
            <h2>Products Cart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartProducts ? 
                        cartProducts.map((product) => {
                            return (
                            <tr>
                                <td>{product.id}</td>
                                <td>{product.products ? product.products[0].title : "-"}</td>
                                <td>{product.amount}</td>
                                <td>{product.products  ? product.products[0].price * product.amount: "-"}</td>
                                <td>
                                <button className="orderButton" onClick={()=>deleteFromCart(cartProducts[0].id)}>Delete</button>
                                </td>
                            </tr>)
                        }) : 
                        <h3>Your cart is empty</h3>
                    }
                    
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span>Full price: {fullPrice}</span>
                        </td>
                        <td>
                            <Link className="orderButton" to="/payment">
                                Place an order
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}