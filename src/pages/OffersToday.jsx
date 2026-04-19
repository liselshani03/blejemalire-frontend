import ProductList from "../components/ProductList";
import products from "../data/products";

export default function OffersToday({ addToCart }) {
  const todaysDate = new Date();

  const filteredProducts = products.filter((product) => {
    return new Date(product.discountEndsAt) >= todaysDate;
  });

  return (
    <div>
      <h2>OFERTAT SOT!!!</h2>
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}