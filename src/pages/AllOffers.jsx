import ProductList from "../components/ProductList";

export default function AllOffers({
  products,
  addToCart,
  removeFromCart,
  cart,
  selectedCategory,
  searchQuery
}) {

  const filteredProducts = products.filter((p) => {

    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <h1>Te gjitha ofertat</h1>

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