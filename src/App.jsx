import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Men from './Components/Men';
import Women from './Components/Women';
import Kids from './Components/Kids';
import Contact from './Components/Contact';
import Cart from './Components/Cart';
import { SearchProvider } from './Components/SearchContext';
import MenProductDetail from './Components/MenProductDetail';
import WomenProductDetail from './Components/WomenProductDetail';
import KidsProductDetail from './Components/KidsProductDetail';
import { CartProvider } from './Components/CartContext.jsx';


function App() {
  return (
    <CartProvider>
     <SearchProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>  
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/men/:id" element={<MenProductDetail />} />
        <Route path="/women/:id" element={<WomenProductDetail />} />
        <Route path="/kids/:id" element={<KidsProductDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </SearchProvider>
    </CartProvider>
  );
}

export default App;
