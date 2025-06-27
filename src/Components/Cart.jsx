import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const rupee = (n) =>
  n.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState('upi');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showPopup, setShowPopup] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [user, setUser] = useState(null);

  /* ── Load user & guard unauthenticated access ─────── */
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      navigate('/', { replace: true });      // kick out if not logged in
    } else {
      setUser(JSON.parse(stored));
    }
  }, [navigate]);

  /* ── Load this user's orders ───────────────────────── */
  useEffect(() => {
    if (user?.mobile) {
      const stored =
        JSON.parse(localStorage.getItem(`orders_${user.mobile}`)) || [];
      setOrders(stored);
    } else {
      setOrders([]);
    }
  }, [user]);

  /* ── Redirect after order placement ───────────────── */
  useEffect(() => {
    if (!redirecting) return;
    const t = setTimeout(() => navigate('/', { replace: true }), 5000);
    return () => clearTimeout(t);
  }, [redirecting, navigate]);

  /* ── Helpers ───────────────────────────────────────── */
  const handleSizeChange = (id, size) =>
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));

  const allSizesSelected = cartItems.every((i) => selectedSizes[i.id]);

  const handlePlaceOrder = () => {
    if (!allSizesSelected) return;

    const order = {
      id: Date.now(),
      items: cartItems.map((i) => ({ ...i, size: selectedSizes[i.id] })),
      user,
      paymentMode,
      total: totalPrice,
      placedAt: new Date().toLocaleString(),
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    };

    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem(`orders_${user.mobile}`, JSON.stringify(newOrders));

    clearCart();
    setSelectedSizes({});
    setShowPopup(true);
    setRedirecting(true);        // ✅ trigger 3-s redirect
  };

  const handleCancelOrder = (orderId) => {
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem(`orders_${user.mobile}`, JSON.stringify(updated));
  };

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter((o) => {
          const diff = (Date.now() - new Date(o.placedAt)) / 86_400_000;
          return filter === 'recent' ? diff <= 7 : diff > 7;
        });

  /* ── While user info is loading ───────────────────── */
  if (!user) {
    return (
      <div className="mt-24 flex justify-center p-8">
        <p className="text-lg font-medium text-gray-700">Loading…</p>
      </div>
    );
  }

  /* ── UI ────────────────────────────────────────────── */
  return (
    <div className="relative mx-auto max-w-4xl p-6">
      <h1 className="mt-20 mb-5 text-center text-3xl font-bold">Your Cart</h1>

      {/* ✅ Success pop-up */}
      {showPopup && (
        <div className="absolute top-50 left-1/2 -translate-x-1/2 z-50 rounded bg-green-500 px-4 py-2 text-white shadow-lg">
          🎉 Order placed successfully! Redirecting...
        </div>
      )}

      {/* ── Cart contents ─────────────────────────────── */}
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your Cart is Empty 🛒</div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="flex-1 sm:ml-4">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500">
                    {item.quantity} × {item.price}
                  </p>
                  <div className="mt-2">
                    <label className="font-semibold">Select Size:</label>
                    <select
                      value={selectedSizes[item.id] || ''}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                      className="ml-2 rounded border px-2 py-1"
                    >
                      <option value="">-- Size --</option>
                      {['S', 'M', 'L', 'XL'].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 sm:mt-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 rounded-full bg-purple-500 text-white hover:bg-purple-700"
                  >
                    −
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="h-8 w-8 rounded-full bg-purple-500 text-white hover:bg-purple-700"
                  >
                    +
                  </button>
                </div>

                <div className="ml-6 font-semibold">
                  {rupee(item.quantity * parseInt(item.price, 10))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Checkout box ───────────────────────────── */}
          <div className="mt-8 rounded-lg bg-purple-50 p-6">
            <div className="space-y-1 text-lg">
              <p>
                <span className="font-semibold">Items:</span> {totalItems}
              </p>
              <p>
                <span className="font-semibold">Total:</span>{' '}
                {rupee(totalPrice)}
              </p>
            </div>

            <div className="mt-4">
              <h2 className="mb-2 text-xl font-semibold">Payment Method</h2>
              <div className="space-y-1">
                {['upi', 'cod', 'netbanking'].map((mode) => (
                  <label key={mode} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={mode}
                      checked={paymentMode === mode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    {mode.toUpperCase()}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <h2 className="font-semibold">Delivery Address</h2>
              <p>
                <b>Name:</b> {user.username}
              </p>
              <p>
                <b>Mobile:</b> {user.mobile}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Address:</b> {user.address}
              </p>
            </div>

            {!allSizesSelected && (
              <p className="mt-2 text-xs text-red-600">
                Select size for every item to enable checkout.
              </p>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={clearCart}
                className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                disabled={!allSizesSelected}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Orders ────────────────────────────────────── */}
      {orders.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-4 text-2xl font-bold">Your Orders</h2>

          <div className="mb-4 flex gap-4 text-sm">
            {['all', 'recent', 'older'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded px-3 py-1 ${
                  filter === f ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                {f === 'all'
                  ? 'All'
                  : f === 'recent'
                  ? 'Recent (Last 7 days)'
                  : 'Older'}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Placed on: {order.placedAt}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold">Delivery Info:</h3>
                    <p>
                      <b>Name:</b> {order.user.username}
                    </p>
                    <p>
                      <b>Mobile:</b> {order.user.mobile}
                    </p>
                    <p>
                      <b>Email:</b> {order.user.email}
                    </p>
                    <p>
                      <b>Address:</b> {order.user.address}
                    </p>
                    <p>
                      <b>Payment:</b> {order.paymentMode.toUpperCase()}
                    </p>
                    <p>
                      <b>Est. Delivery:</b> {order.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">Items:</h3>
                    {order.items.map((item, i) => (
                      <p key={i}>
                        • {item.title} (Size: {item.size}) × {item.quantity}
                      </p>
                    ))}
                    <p className="mt-2 font-semibold">
                      Total: {rupee(order.total)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="mt-4 rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
