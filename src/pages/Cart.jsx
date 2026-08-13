import { useState } from "react";
import { cartAPI } from "../services/api";

export default function Cart({ cart = [], setCart, removeFromCart }) {

  const [updating, setUpdating] = useState(null);
  const [exporting, setExporting] = useState(null);

  const handleRemoveItem = async (productId) => {
    setUpdating(productId);
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    setUpdating(productId);
    try {
      console.log("📦 Updating quantity:", { productId, newQuantity });
      const response = await cartAPI.updateQuantity(productId, newQuantity);
      console.log("✅ Quantity updated:", response);
      
      if (response.success) {
        setCart(response.data || []);
      } else {
        console.error("❌ Update failed:", response.message);
        alert(response.message || "Failed to update quantity");
      }
    } catch (err) {
      console.error("❌ Error updating quantity:", err.message);
      alert(`Error: ${err.message || "Failed to update quantity"}`);
    } finally {
      setUpdating(null);
    }
  };

  const handleExportCart = async (format) => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setExporting(format);
    try {
      const response = await fetch(
        `http://localhost:5000/api/cart-export/export/${format}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to export cart as ${format.toUpperCase()}`);
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const ext = format === "excel" ? "xlsx" : format;
      link.setAttribute("download", `cart_${new Date().getTime()}.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`✅ Cart exported as ${format.toUpperCase()}`);
    } catch (err) {
      console.error(`❌ Error exporting cart as ${format}:`, err);
      alert(`Failed to export cart as ${format.toUpperCase()}`);
    } finally {
      setExporting(null);
    }
  };

  const total = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="cart-page-wrapper">

      <div className="cart-table-section">
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                return (
                  <tr key={item.cart_id}>
                    <td className="cart-img-cell">
                      <img className="cart-img-small" src={item.image} alt={item.name} />
                    </td>
                    <td className="cart-name-cell">{item.name}</td>
                    <td className="cart-price-cell">€{parseFloat(item.price).toFixed(2)}</td>
                    <td className="cart-qty-cell">
                      <div className="cart-qty-control">
                        <button 
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                          disabled={updating === item.product_id}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                          disabled={updating === item.product_id}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="cart-total-cell">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="cart-action-cell">
                      <button
                        className="trash-btn"
                        onClick={() => handleRemoveItem(item.product_id)}
                        disabled={updating === item.product_id}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-box">
            <h3>Cart Summary</h3>
            <div className="cart-total-big">
              €{total.toFixed(2)}
            </div>
            <p className="cart-subtext">Final price for all items</p>

            {/* Export buttons */}
            <div className="cart-export-section">
              <p className="export-label">📥 Download Cart:</p>
              <div className="export-buttons">
                <button 
                  className="export-btn excel-btn"
                  onClick={() => handleExportCart("excel")}
                  disabled={exporting !== null}
                >
                  {exporting === "excel" ? "⏳ Exporting..." : "📊 Excel"}
                </button>
                <button 
                  className="export-btn csv-btn"
                  onClick={() => handleExportCart("csv")}
                  disabled={exporting !== null}
                >
                  {exporting === "csv" ? "⏳ Exporting..." : "📄 CSV"}
                </button>
                <button 
                  className="export-btn pdf-btn"
                  onClick={() => handleExportCart("pdf")}
                  disabled={exporting !== null}
                >
                  {exporting === "pdf" ? "⏳ Exporting..." : "📕 PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}