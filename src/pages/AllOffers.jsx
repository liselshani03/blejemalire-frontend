import ProductList from "../components/Product/ProductList";

export default function AllOffers({
  products,
  addToCart,
  removeFromCart,
  cart,
  selectedCategory,
  searchQuery,
  minPrice,
  maxPrice
}) {
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category === selectedCategory;

    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filter by price range
    const productPrice = parseFloat(p.price) || 0;
    const minPriceNum = minPrice ? parseFloat(minPrice) : 0;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = productPrice >= minPriceNum && productPrice <= maxPriceNum;

    return matchesCategory && matchesSearch && matchesPrice;
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