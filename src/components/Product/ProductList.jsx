import ProductCard from "./ProductCard";

export default function ProductList({ products, addToCart, removeFromCart, cart }) {
  return (
    <div className="product-grid">
      {products.map((p) => {
        const cartItem = Array.isArray(cart)
        ? cart.find(item => item.product_id === p.id)
        : null;
        return (
          <ProductCard
            key={p.id}
            p={p}
            cartItem={cartItem}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
}