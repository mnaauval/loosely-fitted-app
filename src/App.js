import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Announcement from "./components/Announcement";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";

function App() {
  return (
    <Router>
      <Announcement />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
      </Routes>
      <Newsletter />
      <Footer />
    </Router>
  );
}

export default App;
