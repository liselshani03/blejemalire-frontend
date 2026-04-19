import ProductList from "../components/ProductList";
import products from "../data/products";

export default function AllOffers( { addToCart }) {
  return (
    <div>
      <h1>Të gjitha ofertat</h1>
      <ProductList products={products} addToCart={addToCart}/>
    </div>
  );
}