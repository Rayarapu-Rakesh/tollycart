// File: Kids.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { SearchContext } from './SearchContext';

export const kidsProducts = [
  { id: 21, title: "Kids T-Shirt", price: "350/-", image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/27651332/2024/2/17/fce8bd77-9210-44c6-8974-a2c1c89a106f1708112060983KidsvilleMinecraftPrintedRegularFitTshirtForBoys1.jpg" },
  { id: 22, title: "Girls Frock", price: "450/-", image: "https://www.jiomart.com/images/product/original/rvriwubuvd/aashrun-kids-frocks-kids-dress-party-wear-party-frocks-fancy-frocks-fancy-frockrocks-rayon-frocks-rayon-frock-blue-frock-knee-length-frock-frock-for-girls-frocks-for-kids-baby-dress-baby-frocks-white-product-images-rvriwubuvd-0-202309081315.jpg?im=Resize=(500,630)" },
  { id: 23, title: "Kids Hoodie", price: "699/-", image: "https://5.imimg.com/data5/SELLER/Default/2023/1/KB/BV/GO/93210571/hoodie-work-file-cover-images-500x500.jpg" },
  { id: 24, title: "Dungarees", price: "799/-", image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N30477s.jpg?im=Resize,width=750" },
  { id: 25, title: "Boys Jeans", price: "599/-", image: "https://m.media-amazon.com/images/I/71AZQ30W-AL._AC_UY1100_.jpg" },
  { id: 26, title: "Girls Skirt", price: "399/-", image: "https://www.mumkins.in/cdn/shop/products/western-dresses-for-kids-gs20322-white-6.jpg?v=1640159440" },
  { id: 27, title: "Kids Tracksuit", price: "849/-", image: "https://trenz.co.in/cdn/shop/products/actionace-boys-tracksuit-kids-656794.jpg?v=1705655925" },
  { id: 28, title: "Kids Ethnic Wear", price: "999/-", image: "https://babymoo.in/cdn/shop/files/5458-ZARI_1_8861f775-b1f5-4343-a96e-355093b0996c.jpg?v=1719855133" },
];

const images = [
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/new-arrival-fashion-sale-for-kids-wear-clothi-design-template-1b6bffbfe64563b23b761daa6e4062d4_screen.jpg?ts=1607502870",
  "https://www.shutterstock.com/image-vector/cute-baby-banner-bear-balloon-260nw-2061834287.jpg",
  "https://i.pinimg.com/736x/77/35/2b/77352b96bb8815adb5141d63d33ecb5a.jpg",
];

const ITEMS_PER_LOAD = 4;

const Kids = () => {
  const { getItemQuantity } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadIndex, setLoadIndex] = useState(1);
  const loaderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProducts = kidsProducts.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoadIndex(1);
  }, [searchTerm]);

  useEffect(() => {
    const next = filteredProducts.slice(0, ITEMS_PER_LOAD * loadIndex);
    setVisibleProducts(next);
  }, [loadIndex, searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleProducts.length < filteredProducts.length) {
          setLoadIndex(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleProducts, filteredProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 bg-purple-50 min-h-screen">
      {searchTerm === '' && (
        <div className="relative max-w-8xl mx-auto mb-6">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-[80vh] mt-15 bg-cover bg-center rounded-lg shadow-md transition duration-700 ease-in-out"
          />
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20">
        {visibleProducts.length > 0 ? visibleProducts.map(product => (
          <Link to={`/kids/${product.id}`} key={product.id} className="block">
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform transition hover:scale-105">
              <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-purple-700 font-semibold mb-2">{product.price}</p>
                <div className="w-full bg-purple-500 text-white px-4 py-2 rounded text-center hover:bg-purple-700">
                  View Details
                </div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="text-center text-gray-500 col-span-full">
            No products found.
          </div>
        )}
      </div>

      <div ref={loaderRef} className="w-full text-center mt-6 text-purple-500">
        {visibleProducts.length < filteredProducts.length
          ? "Loading more products..."
          : filteredProducts.length > 0
          ? "No more products."
          : ""}
      </div>
    </div>
  );
};

export default Kids;
