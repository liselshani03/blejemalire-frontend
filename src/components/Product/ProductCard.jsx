import { useState } from "react";

export default function ProductCard({
  p,
  cartItem,
  addToCart
}) {
  const [showModal, setShowModal] = useState(false);
  const [tempQty, setTempQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const openModal = () => {
    setShowModal(true);

    if (cartItem) {
      setTempQty(cartItem.quantity);
    } else {
      setTempQty(1);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setTempQty(1);
  };

  const increase = () => setTempQty(prev => prev + 1);

  const decrease = () =>
    setTempQty(prev => (prev > 1 ? prev - 1 : 1));

  // ✅ UPDATED: Call addToCart with productId and quantity
  const confirmAdd = async () => {
    setIsAdding(true);
    try {
      await addToCart(p.id, tempQty);
      closeModal();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const discount = p.old_price 
    ? Math.round(((parseFloat(p.old_price) - parseFloat(p.price)) / parseFloat(p.old_price)) * 100)
    : 0;

  return (
    <>
      <div className="product-card">

        <h2 className="product-title">{p.name}</h2>

        {p.store && <span className="product-store">📍 {p.store}</span>}

        <div className="image-wrapper">
          <img className="product-img" src={p.image} alt={p.name} />
        </div>

        <div className="price-row">
          <span className="price">€{parseFloat(p.price).toFixed(2)}</span>
          {p.old_price && (
            <span className="old-price">€{parseFloat(p.old_price).toFixed(2)}</span>
          )}
        </div>

        {discount > 0 && (
          <>
            <span className="discount-badge">-{discount}%</span>
            {p.discount_ends_at && (
              <span className="discountDate">Until: {new Date(p.discount_ends_at).toLocaleDateString()}</span>
            )}
          </>
        )}

        <button className="btn-add" onClick={openModal} disabled={isAdding}>
          {cartItem ? `In cart (${cartItem.quantity})` : "Add"}
        </button>

      </div>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h3>{p.name}</h3>

            {p.store && <p className="modal-store">📍 Store: {p.store}</p>}

            <div className="modal-prices">
              <span className="modal-price">€{parseFloat(p.price).toFixed(2)}</span>
              {p.old_price && (
                <span className="modal-old-price">€{parseFloat(p.old_price).toFixed(2)}</span>
              )}
              {discount > 0 && <span className="modal-discount">-{discount}%</span>}
            </div>

            {p.discount_ends_at && (
              <p className="modal-date">Valid until: {new Date(p.discount_ends_at).toLocaleDateString()}</p>
            )}

            <div className="qty-control">
              <button onClick={decrease} disabled={isAdding}>-</button>
              <span>{tempQty}</span>
              <button onClick={increase} disabled={isAdding}>+</button>
            </div>

            <div className="modal-actions">

              <button onClick={confirmAdd} disabled={isAdding}>
                {isAdding ? "Adding..." : "Add to cart"}
              </button>

              <button onClick={closeModal} disabled={isAdding}>
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}