import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OffersToday from "./pages/OffersToday";
import AllOffers from "./pages/AllOffers";
import Cart from "./pages/Cart";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  
  const [cart, setCart] = useState([]);

  const addToCart = (p) => {
  setCart([...cart, p]);
  };

  const removeFromCart = (id) => {
  setCart(cart.filter((item) => item.id !== id));
};
  return (

    <BrowserRouter>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<OffersToday addToCart={addToCart}   removeFromCart={removeFromCart}   cart={cart}/>} />
        <Route path="/offers-today" element={<OffersToday addToCart={addToCart}   removeFromCart={removeFromCart}   cart={cart}/>} />
        <Route path="/all-offers" element={<AllOffers addToCart={addToCart}   removeFromCart={removeFromCart}   cart={cart}/>} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;