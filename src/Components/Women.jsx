// File: Women.jsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { SearchContext } from './SearchContext';

export const womenProducts = [
  { id: 1, title: "Kurti", price: "799/-", image: "https://assets.ajio.com/medias/sys_master/root/20231006/I7Sy/652033f7ddf779151926e4c2/-473Wx593H-466680643-white-MODEL.jpg" },
  { id: 2, title: "Saree", price: "1299/-", image: "https://d1311wbk6unapo.cloudfront.net/NushopCatalogue/tr:f-webp,w-600,fo-auto/64f99a0ad51f9400133b0914/cat_img/Shraddha_Beige_Narayanapet_Pure_Cotton_saree__FDU30WDHZW_2024-11-16_1.jpg" },
  { id: 3, title: "Jeans", price: "999/-", image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/25156196/2023/9/25/213c5af2-4550-4b78-987b-23cdc8ee7ecd1695630887828HighStarWomenBlueStraightFitHigh-RiseStretchableJeans1.jpg" },
  { id: 4, title: "Dress", price: "1499/-", image: "https://claura.in/cdn/shop/files/drs-30-blue.jpg?v=1737525916" },
  { id: 5, title: "Top", price: "499/-", image: "https://sheetalonlinefashion.in/cdn/shop/files/rw6e8_512.webp?v=1711563137" },
  { id: 6, title: "Skirt", price: "899/-", image: "https://befashionate.in/cdn/shop/files/frill_flare_vol_3_1544-A.jpg?v=1689156350" },
  { id: 7, title: "Jumpsuit", price: "1399/-", image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/17241706/2024/3/11/c2a50baf-f1c7-45aa-b4a7-5777e7ecdb441710156209516-Uptownie-Lite-Women-Sleeveless-Jumpsuit-2261710156209150-1.jpg" },
  { id: 8, title: "Ethnic Set", price: "1699/-", image: "https://assets.ajio.com/medias/sys_master/root/20240823/fTvB/66c795396f60443f31217fa4/-473Wx593H-467165695-blue-MODEL.jpg" },
  { id: 9, title: "Leggings", price: "399/-", image: "https://myprisma.in/cdn/shop/products/2_71f1b55d-238a-4d14-8055-7d28a1f8a400.jpg?v=1678973048" },
  { id: 10, title: "Co-Ord Set", price: "1799/-", image: "https://www.frionkandy.com/cdn/shop/products/SHKY1017_11fb7e17-63fa-436c-8a23-fcb7d0ae37c9.jpg?v=1701726413" },
];

const images = [
  "https://officeandyou.in/cdn/shop/files/Green_Feminine_and_Beauty_New_Collection_Promotion_Banner.png?v=1712385334&width=3000",
  "https://www.ethnicplus.in/media/magefan_blog/ezgif-2-6070d64cec.webp",
  "https://i.ytimg.com/vi/-jFk5vFPxnE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCq7XUBWU0a8rdGNSHvDPPp8xrtuQ"
];

const ITEMS_PER_LOAD = 4;

const Women = () => {
  const { getItemQuantity } = useContext(CartContext);
  const { searchTerm } = useContext(SearchContext);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loadIndex, setLoadIndex] = useState(1);
  const loaderRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredProducts = womenProducts.filter(item =>
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
          <Link to={`/women/${product.id}`} key={product.id} className="block">
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
          <div className="text-center text-gray-500 col-span-full">No products found.</div>
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

export default Women;
