import ProductList from "../components/ProductList";

export default function OffersToday({
  products,
  addToCart,
  removeFromCart,
  cart,
  selectedCategory,
  searchQuery
}) {

  const filteredProducts = products.filter((p) => {

    const isValid = new Date(p.discountEndsAt) >= new Date();

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return isValid && matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h1>OFERTAT DITORE 🔥</h1>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ProductList
          products={filteredProducts}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      )}
    </div>
  );
}