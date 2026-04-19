import ProductList from "../components/ProductList";
import products from "../data/products";

export default function OffersToday({ addToCart, removeFromCart, cart }) {
  const todaysDate = new Date();

  const filteredProducts = products.filter((product) => {
    return new Date(product.discountEndsAt) >= todaysDate;
  });

  return (
    <div>
      <h1>OFERTAT DITORE! 🔥⌛</h1>
      <ProductList
      products={products} 
      addToCart={addToCart} 
      removeFromCart={removeFromCart}
      cart={cart}
      />
    </div>
  );
}