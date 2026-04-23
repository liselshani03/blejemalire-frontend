export default function ProductList({ products, addToCart, removeFromCart, cart }) {

  return (
    <div className="product-grid">
      {products.map((p) => {
        const isInCart = cart.some((item) => item.id === p.id);

        return (
          <div key={p.id} className="product-card">
            <h2 className="product-title">{p.name}</h2>

            <div className="image-wrapper">
            <img className="product-img" src={p.image} alt={p.name} />
            </div>
      
            <div className="price-row">
            <span className="price">{p.price}€</span>
            <span className="old-price">{p.oldPrice}€</span>
            </div>

            <span className="discountDate"  >{p.discountEndsAt}</span>
            
            <button
              className={isInCart ? "btn-remove" : "btn-add"}
              onClick={() =>
                isInCart ? removeFromCart(p.id) : addToCart(p)
              }
            >
              {isInCart ? "Remove" : "Add"}
            </button>
          </div>
        );
      })}
    </div>
  );
}