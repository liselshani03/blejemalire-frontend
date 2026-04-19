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
  const exists = cart.find((item) => item.id === p.id);

  if (!exists) {
    setCart([...cart, p]);
  }
};
  return (

    <BrowserRouter>
    
      <Navbar />

      <Routes>
        <Route path="/" element={<OffersToday addToCart={addToCart}/>} />
        <Route path="/offers-today" element={<OffersToday addToCart={addToCart}/>} />
        <Route path="/all-offers" element={<AllOffers addToCart={addToCart}/>} />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;