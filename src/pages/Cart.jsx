export default function Cart({ cart = [] }) {
  return (
    <div className="cart-grid">
      {cart.map((item) => {
        const discount = Math.round(
          ((item.oldPrice - item.price) / item.oldPrice) * 100
        );

        return (
          <div key={item.id} className="cart-item">
            <img className="cart-img" src={item.image} alt={item.name} />

            <span className="cart-name">{item.name}</span>

            <span className="cart-price">€{item.price}</span>

            <span className="cart-discount">-{discount}%</span>
          </div>
        );
      })}
    </div>
  );
}