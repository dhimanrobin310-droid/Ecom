import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./context";

const currency = (value) => `$${Number(value || 0).toFixed(2)}`;
const getQuantity = (value) => {
  const quantity = Number(value);
  return Number.isFinite(quantity) && quantity >= 1 ? Math.floor(quantity) : 1;
};

export const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadCart = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:9000/api/cartget/${id}`);
        if (!response.ok) throw new Error("Unable to load your cart.");

        const result = await response.json();
        if (result.statuscode !== 1) throw new Error("Unable to load your cart.");
        setItems((result.Data || []).map((item) => ({
          ...item,
          Quantity: getQuantity(item.Quantity),
        })));
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [id]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.Price || 0) * getQuantity(item.Quantity), 0),
    [items],
  );
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 8;
  const total = subtotal + shipping;

  const updateQuantity = (itemId, change) => {
    setItems((currentItems) => currentItems.map((item) => (
      item._id === itemId
        ? { ...item, Quantity: Math.max(1, getQuantity(item.Quantity) + change) }
        : item
    )));
  };

  const removeItem = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item._id !== itemId));
  };

  return (
    <main className="cart-page">
      <section className="cart-hero">
        <div className="container">
          <button className="cart-back-link" onClick={() => navigate("/")} type="button">
            <span aria-hidden="true">←</span> Continue shopping
          </button>
          <div className="cart-hero-content">
            <div>
              <p className="cart-eyebrow">Your shopping bag</p>
              <h1>Ready when you are.</h1>
              <p>Review your picks, then head to a secure checkout.</p>
            </div>
            <div className="cart-hero-count">
              <strong>{items.length}</strong>
              <span>{items.length === 1 ? "item" : "items"} in cart</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cart-page-section">
        <div className="container cart-layout">
          <div className="cart-main-panel">
            <div className="cart-panel-header">
              <div>
                <h2>Cart details</h2>
                <p>{loading ? "Loading your items..." : "Everything you have selected is right here."}</p>
              </div>
              {!loading && items.length > 0 && <span className="cart-delivery-pill">Free delivery over $100</span>}
            </div>

            {loading && <div className="cart-loading">Loading your cart...</div>}

            {!loading && error && (
              <div className="cart-message cart-error" role="alert">
                {error} <button type="button" onClick={() => window.location.reload()}>Try again</button>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="cart-empty-state">
                <div className="cart-empty-icon" aria-hidden="true">🛍️</div>
                <h3>Your cart is waiting for something special.</h3>
                <p>Browse our collection and add products you love.</p>
                <button className="cart-primary-btn" type="button" onClick={() => navigate("/")}>Start shopping</button>
              </div>
            )}

            {!loading && !error && items.length > 0 && (
              <div className="cart-items-list">
                {items.map((item) => (
                  <article className="cart-product" key={item._id}>
                    <div className="cart-product-image-wrap">
                      <img src={`/uploads/${item.Img}`} alt={item.Name} className="cart-product-image" />
                    </div>
                    <div className="cart-product-info">
                      <p className="cart-product-label">Selected item</p>
                      <h3>{item.Name}</h3>
                      <p className="cart-unit-price">{currency(item.Price)} each</p>
                      <div className="cart-product-actions">
                        <div className="cart-quantity-control" aria-label={`Quantity for ${item.Name}`}>
                          <button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item._id, -1)} disabled={getQuantity(item.Quantity) <= 1}>−</button>
                          <span>{getQuantity(item.Quantity)}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item._id, 1)}>+</button>
                        </div>
                        <button className="cart-text-button" type="button" onClick={() => removeItem(item._id)}>Remove</button>
                      </div>
                    </div>
                    <div className="cart-product-total">
                      <span>Item total</span>
                      <strong>{currency(Number(item.Price) * getQuantity(item.Quantity))}</strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="cart-summary-card">
            <div className="cart-summary-heading">
              <span className="cart-summary-icon" aria-hidden="true">✦</span>
              <div><p>Order summary</p><h2>Total at a glance</h2></div>
            </div>
            <div className="cart-summary-rows">
              <div><span>Subtotal</span><strong>{currency(subtotal)}</strong></div>
              <div><span>Shipping</span><strong>{shipping === 0 ? "Free" : currency(shipping)}</strong></div>
              <div className="cart-summary-note"><span>Delivery</span><em>{subtotal >= 100 ? "You qualify for free delivery" : "Free over $100"}</em></div>
            </div>
            <div className="cart-summary-total"><span>Total</span><strong>{currency(total)}</strong></div>
            <button className="cart-checkout-btn" type="button" disabled={!items.length || loading} onClick={() => navigate(`/checkout?id=${id}`, { state: { totalprice: total } })}>
              Proceed to checkout <span aria-hidden="true">→</span>
            </button>
            <p className="cart-secure-note"><span aria-hidden="true">🔒</span> Secure checkout · Taxes calculated at checkout</p>
          </aside>
        </div>
      </section>
    </main>
  );
};
