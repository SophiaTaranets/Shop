import './HomePage.css';
import ProductList from '../ProductList/ProductList';
import cart from '../../Icons/shopping_cart.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {ARI_URL} from '../../constants'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ARI_URL}/products/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
            .then(function (response) {
                setProducts(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
      }, [])

      const handleLogout = (e) => {
        localStorage.clear()
        navigate("/login")
      }

    return (
        <div className="container">
            <div>
                    {userMessage &&
                        <AlertMessage setMessage={setUserMessage} message={userMessage.message} code={userMessage.code}/>
                    }
            </div>
            <div className="header">
                <h1>HomePage</h1>
                <div>
                    <Link to="/cart" style={{marginLeft: "15px"}}>
                        <img src={cart} alt="shopping cart" />
                    </Link>

                    {
                        localStorage.getItem("Token") ? <p style={{cursor: "pointer"}} onClick={handleLogout} >Log out</p> : 
                        <Link className="loginButton" to="/login">
                            Login
                        </Link>
                    }
                    
                </div>
            </div>
            <ProductList products={products} setUserMessage={setUserMessage} />
        </div>
    );
}
