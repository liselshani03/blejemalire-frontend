import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OffersToday from "./pages/OffersToday";
import AllOffers from "./pages/AllOffers";
import Cart from "./pages/Cart";
import products from "./data/products";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (p) => {
    setCart(prev => [...prev, p]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter((item) => item.id !== id));
  };

  return (
    <BrowserRouter>

      {/* NAVBAR CONTROL CENTER */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showSearch={true}
      />

      <Routes>

        <Route
          path="/"
          element={
            <AllOffers
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />

        <Route
          path="/offers-today"
          element={
            <OffersToday
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />

        <Route
          path="/all-offers"
          element={
            <AllOffers
              products={products}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />

        <Route path="/cart" element={<Cart cart={cart} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;