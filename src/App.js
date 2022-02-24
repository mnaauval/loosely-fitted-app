import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductsList from "./pages/ProductsList";

function App() {
  return (
    <Router>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlist" element={<ProductsList />} />
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
