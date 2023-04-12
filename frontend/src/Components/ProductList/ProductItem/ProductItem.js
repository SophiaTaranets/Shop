import React, {useState} from 'react';
import './ProductItem.css';

export default function ProductItem({ title, price, description, onAddToCart, id }) {
    const [amount, setAmount] = useState(1);


    return (
        <div className="ItemContainer">
            <div className="ItemInfo">
                <h3>{title}</h3>
                <p>{description}</p>
                <span>{price}</span>
                <input
                    type="number"
                    placeholder='1'
                    step="1"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button className="ItemAdd" onClick={()=>onAddToCart(id, amount)}>
                Add to cart
            </button>
        </div>
    );
}
