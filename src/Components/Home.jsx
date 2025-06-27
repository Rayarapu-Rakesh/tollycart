import React, { useRef } from 'react';
import { GiReturnArrow } from "react-icons/gi";
import { IoMdCash } from "react-icons/io";
import { GiPriceTag } from "react-icons/gi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Home = () => {
  const productRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const termsRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const products = [
    { id: 1, title: "Casual Shirt", image: "https://images.meesho.com/images/products/432113074/xhwhu_512.webp" },
    { id: 2, title: "T-Shirt", image: "https://airtex.in/cdn/shop/files/Men-stylish-T-Shirt-Black-milenge-white-with-red-stripe-Airtex-64878688.jpg?v=1721400696" },
    { id: 3, title: "Shoes", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/o/7/u/7-pista-7-roaster-white-original-imagwdw5fgx2hepm.jpeg?q=90&crop=false" },
    { id: 4, title: "Pants", image: "https://m.media-amazon.com/images/I/81mM4hFegbL._AC_UY350_.jpg" },
    { id: 5, title: "Kids Ethnic Wear", image: "https://www.momshome.in/cdn/shop/files/2_1_4.jpg?v=1720620921" },
    { id: 6, title: "sarees", image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/29521464/2024/6/7/54413e30-3439-4e87-b2aa-df91b271ed091717740493591-KALINI-Woven-Design-Zari-Silk-Blend-Paithani-Saree-569171774-5.jpg" },
    { id: 7, title: "Jumpsuit", image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25588818/2023/10/21/1ca186d1-e4e6-4e6f-b770-86cf520e953a1697904702326indostreetYellowBasicJumpsuit1.jpg" },
    { id: 8, title: "Jacket", image: "https://yourdesignstore.s3.amazonaws.com/uploads/yds/productImages/thumb/1629717737612384e9619ceYDS_Product_4@2x.jpg" },
    { id: 9, title: "Dungarees", image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/24547544/2023/9/12/b62772fd-d0ce-4953-97d9-e5f00af908271694495237975-Boohoo-Women-Boyfriend-Fit-Denim-Dungarees-9891694495237839-1.jpg" },
    { id: 10, title: "ladies Pants", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2j04VCeZKa9FZ0H7KAKVRa-B96yVKVXnHVQ&s" },
    { id: 11, title: "Skirt", image: "https://sassafras.in/cdn/shop/products/SFSKRT30393-1_1800x.jpg?v=1748267064" },
    { id: 12, title: "Kurti", image: "https://odhni.com/cdn/shop/files/24_9ef283e8-d9c4-44fb-b9f6-9b829665942c.jpg?v=1718380246" }
  ];

  return (
    <div ref={homeRef} className='h-screen'>
      {/* HERO SECTION */}
      <div className="relative w-full h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/008/878/933/large_2x/online-shopping-store-on-smartphone-with-shopping-cart-and-bags-on-purple-background-3d-rendering-free-photo.jpg')] bg-cover bg-center ">
        <div className="absolute inset-0 flex items-center justify-center px-4 ">
          <div className="text-white p-6 sm:p-8 mt-10 ml-[-80px] md:p-10 rounded-xl text-center max-w-xl z-10 absolute top-3 left-15">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Welcome to TollyCart</h1>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Discover the latest trends in fashion for men, women, and kids. Shop premium clothing at the best prices!
            </p>
            <button onClick={() => scrollTo(productRef)} className="mt-2 bg-purple-600 hover:bg-white hover:text-purple-600 px-5 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* INFO BANNER */}
      <div className="w-full bg-fuchsia-100 border-2 border-fuchsia-300 py-3 px-4 flex flex-wrap sm:flex-nowrap justify-evenly items-center gap-4 text-sm sm:text-base">
        <span className="inline-flex items-center gap-2 text-fuchsia-700 font-medium">
          <GiReturnArrow className="text-lg" /> 7 Days Easy Return
        </span>
        <span className="inline-flex items-center gap-2 text-fuchsia-700 font-medium">
          <IoMdCash className="text-lg" /> Cash on Delivery
        </span>
        <span className="inline-flex items-center gap-2 text-fuchsia-700 font-medium">
          <GiPriceTag className="text-lg" /> Lowest Prices
        </span>
      </div>

      {/* PRODUCT SECTION */}
      <div ref={productRef} className="bg-purple-100 py-6 px-4 mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-3 text-center">
              <h3 className="text-gray-700 font-semibold text-sm truncate mb-1">{product.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ABOUT US SECTION */}
      <div ref={aboutRef} className="bg-white px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">TollyCart is committed to bringing you trendy and affordable fashion. We value style, comfort, and customer satisfaction. With a wide range of products for men, women, and kids, we make online shopping seamless and joyful.</p>
      </div>

      {/* CONTACT SECTION */}
      <div ref={contactRef} className="bg-purple-100 px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700">Email: support@tollycart.com</p>
        <p className="text-gray-700">Phone: +91 98765 43210</p>
      </div>

      {/* TERMS SECTION */}
      <div ref={termsRef} className="bg-white px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">By using our website, you agree to our policies. Please review our terms regularly. We ensure your shopping experience is secure and pleasant.</p>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-purple-600 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3">TollyCart</h2>
            <p className="text-sm">Your one-stop fashion destination for men, women, and kids. Enjoy best prices and doorstep delivery!</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li><button onClick={() => scrollTo(homeRef)} className="hover:underline">Home</button></li>
              <li><button onClick={() => scrollTo(aboutRef)} className="hover:underline">About Us</button></li>
              <li><button onClick={() => scrollTo(contactRef)} className="hover:underline">Contact</button></li>
              <li><button onClick={() => scrollTo(termsRef)} className="hover:underline">Terms & Conditions</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 mt-4 text-xl">
  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
  </a>
  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="hover:text-pink-400 cursor-pointer" />
  </a>
  <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="hover:text-sky-400 cursor-pointer" />
  </a>
</div>

          </div>
        </div>

        <div className="text-center mt-6 text-sm text-purple-100 border-t border-purple-400 pt-4">
          &copy; {new Date().getFullYear()} TollyCart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
