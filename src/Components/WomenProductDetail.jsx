// File: WomenProductDetail.jsx
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { womenProducts } from './Women'; // Import the product list from Women.jsx

const WomenProductDetail = () => {
  const { id } = useParams();
  const product = womenProducts.find(p => p.id === parseInt(id));
  const { addToCart, removeFromCart, getItemQuantity } = useContext(CartContext);
  const quantity = product ? getItemQuantity(product.id) || 0 : 0;

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <h2>Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.title} className="w-full h-[400px] object-cover rounded-lg" />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-purple-800 mb-2">{product.title}</h2>
            <p className="text-xl text-gray-700 mb-4">{product.price}</p>
          </div>

          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                className="bg-purple-500 text-white w-10 h-10 rounded-full hover:bg-purple-700"
                onClick={() => removeFromCart(product.id)}
              >−</button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                className="bg-purple-500 text-white w-10 h-10 rounded-full hover:bg-purple-700"
                onClick={() => addToCart(product)}
              >+</button>
            </div>
          )}

          <Link to="/women" className="mt-6 inline-block text-purple-600 hover:underline">
            ← Back to Women's Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WomenProductDetail;
