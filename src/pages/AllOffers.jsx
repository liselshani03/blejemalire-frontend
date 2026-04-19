import ProductList from "../components/ProductList";
import products from "../data/products";

export default function AllOffers( { addToCart, removeFromCart, cart }) {
  return (
    <div>
      <h1>Te gjitha ofertat</h1>
      <ProductList 
      products={products} 
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      cart={cart}
      />
    </div>
  );
}