import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import {ARI_URL, SUCCESS_CODE, ERROR_CODE} from '../../constants'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../AlertMessage/AlertMessage';

export default function PaymentPage() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cartList, setCartList] = useState('');
    const [userMessage, setUserMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${ARI_URL}/shoppingcart/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('Token')}`
            }
        })
            .then(function (response) {
                setCartList(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

      }, [])

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your login logic here, e.g., make an API request
        const isAddressValid = inputValidate('address');
        const isNameValid = inputValidate('name');
        const isPhoneValid = inputValidate('phone');
        const isEmailValid = inputValidate('email');
        if (!isAddressValid) {
            setAddressError('Please enter a valid address');
        }
        if (!isNameValid) {
            setNameError('Please enter a valid name');
        }
        if (!isPhoneValid) {
            setPhoneError('Please enter a valid phone');
        }
        if (!isEmailValid) {
            setEmailError('Please enter a valid email');
        } if (isAddressValid && isNameValid && isPhoneValid && isEmailValid) {
            setAddressError('');
            setEmailError('');
            setNameError('');
            setPhoneError('');
            // Add your login logic here, e.g., make an API request
            
            // Reset input values after form submission
            setEmail('');
            setName('');
            setPhoneNumber('');
            setAddress('');

            
            const productsIDs = cartList.map(obj => obj.products.map(
                obj1 => obj1.id
            )[0])
            const cartIDs = cartList.map(obj => obj.id)
            const orderData = {
                products: productsIDs,
                order_date: new Date().toISOString().slice(0, 10),
                number_phone : phoneNumber,
                address : address
            }
            
            axios.post(`${ARI_URL}/order/`,orderData, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('Token')}`
                }
            })
            .then(function (response) {
                cartIDs.map(obj => {
                    axios.patch(`${ARI_URL}/shoppingcart/${obj}/` ,{status: "closed"}, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('Token')}`
                        }
                    })
                    .then(function (response) {
                        setUserMessage({message: "Done", code: SUCCESS_CODE})
                        setTimeout(() => {
                            navigate("/");
                        }, 3500)
                    })
                    .catch(function (error) {
                        console.log(error);
                        setUserMessage({message: "Something went wrong!", code: ERROR_CODE})
                    });
                })
                
                
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
    };

    const inputValidate = (type) => {
        // Simple email validation using regular expression
        switch (type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            case 'name':
                return name.length >= 4;
            case 'phone':
                const phoneNumberRegex = /^\d{10}$/;
                return phoneNumberRegex.test(phoneNumber);
            case 'address':
                const addressRegex = /^.{5,}$/;
                return addressRegex.test(address);
            default:
                break;
        }
    };

    return (
        <div className="orderContainer">
            <div>
                    {userMessage &&
                        <AlertMessage setMessage={setUserMessage} message={userMessage.message} code={userMessage.code}/>
                    }
            </div>
            <div className="orderForm">
                <h2>Payment Page</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Email</label>
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Phone number</label>
                    {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
                    <input
                        type="text"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label>Adress</label>
                    {addressError && (
                        <p style={{ color: 'red' }}>{addressError}</p>
                    )}
                    <input
                        type="text"
                        placeholder="Adress"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>
    );
}
