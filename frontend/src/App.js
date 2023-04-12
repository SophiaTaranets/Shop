import HomePage from './Components/HomePage/HomePage';
import LoginPage from './Components/LoginPage/LoginPage';
import CartPage from './Components/CartPage/CartPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaymentPage from './Components/PaymentPage/PaymentPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
