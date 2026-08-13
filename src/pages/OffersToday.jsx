import ProductList from "../components/Product/ProductList";

export default function OffersToday({
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
    const isValid = new Date(p.discount_ends_at) >= new Date();

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

    return isValid && matchesCategory && matchesSearch && matchesPrice;
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