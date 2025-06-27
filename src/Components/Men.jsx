import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { SearchContext } from './SearchContext';

const images = [
  "https://templates.simplified.co/thumb/467f8964-64a6-4c45-9c48-05e877088548.jpg",
  "https://cdn.dribbble.com/userupload/28199204/file/original-0badbecec0242c573a603601bf631d34.jpg?resize=752x&vertical=center",
  "https://assetscdn1.paytm.com/images/catalog/view_item/661494/1602832062320.png?imwidth=1600&impolicy=hq",
];

export const allProducts = [
  { id: 1, title: "Casual Shirt", price: "500/-", image: "https://static.cilory.com/681508-thickbox_default/nologo-white-navy-checked-casual-shirt.jpg" },
  { id: 2, title: "T-Shirt", price: "400/-", image: "https://d2fy0k1bcbbnwr.cloudfront.net/Designs_Inners_and_Outers/Tshirts/Men/tshirt_hs_men_pat_d48_o.jpg" },
  { id: 3, title: "Sneakers", price: "3000/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/o/7/u/7-pista-7-roaster-white-original-imagwdw5fgx2hepm.jpeg?q=90&crop=false" },
  { id: 4, title: "Formal Shirt", price: "600/-", image: "https://assets.ajio.com/medias/sys_master/root/20231012/SHy7/65280fb2ddf779151937c284/-473Wx593H-469514976-purple-MODEL.jpg" },
  { id: 5, title: "Hoodie", price: "1100/-", image: "https://nobero.com/cdn/shop/files/WhatsAppImage2023-11-09at10.34.47AM.jpg?v=1734845956" },
  { id: 6, title: "Pants", price: "999/-", image: "https://m.media-amazon.com/images/I/81mM4hFegbL._AC_UY350_.jpg" },
  { id: 7, title: "Jacket", price: "1499/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwvSR5e4GmWKJPNX-qU4Z_idWSlPY8X84xgQ&s" },
  { id: 8, title: "Tracksuit", price: "1299/-", image: "https://img1.exportersindia.com/product_images/bc-full/2022/1/9773540/mens-sports-tracksuit-1642507340-6163709.jpeg" },
  { id: 9, title: "Blazer", price: "1999/-", image: "https://m.media-amazon.com/images/I/81hxQIUMo1L._AC_UY1100_.jpg" },
  { id: 10, title: "Ethnic Wear", price: "1499/-", image: "https://img.tatacliq.com/images/i13/437Wx649H/MP000000019495598_437Wx649H_202309292008551.jpeg" },
];

const ITEMS_PER_LOAD = 4;

const Men = () => {
  const { getItemQuantity } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);

  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadIndex, setLoadIndex] = useState(1);
  const loaderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProducts = allProducts.filter(item =>
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
      (entries) => {
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 bg-purple-50 min-h-screen">
      {/* Carousel */}
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-20">
        {visibleProducts.length > 0 ? visibleProducts.map(product => (
          <Link to={`/men/${product.id}`} key={product.id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform transition hover:scale-105">
              <img src={product.image} alt={product.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                <p className="text-purple-700 font-semibold mb-2">{product.price}</p>
                <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        )) : (
          <div className="text-center text-gray-500 col-span-full">No products found.</div>
        )}
      </div>

      {/* Loader */}
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

export default Men;
