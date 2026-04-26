import ProductCard from "./ProductCard";

export default function ProductList({ products, addToCart, removeFromCart, cart }) {
  return (
    <div className="product-grid">
      {products.map((p) => {
        const isInCart = cart.some(item => item.id === p.id);
        return (
          <ProductCard
            key={p.id}
            p={p}
            isInCart={isInCart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
}