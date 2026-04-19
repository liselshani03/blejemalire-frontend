export default function ProductList({ products, addToCart }) {
  return (
    <div className="product-grid">

      {products.map((p) => (

        <div key={p.id} className="product-card">
          <h2 className="product-title">{p.name}</h2>
          <img className="product-img" src={p.image} alt={p.name} />
          <p>{p.price}€</p>
          <p className="old-price">{p.oldPrice}€</p>
          <button onClick={() => addToCart(p)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}