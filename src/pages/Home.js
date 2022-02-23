import React from "react";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import ProductsPopular from "../components/ProductsPopular";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <ProductsPopular />
      <Newsletter />
    </>
  );
};

export default Home;
