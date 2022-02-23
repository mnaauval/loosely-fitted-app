import React from "react";
import Categories from "../components/Categories";
import ProductsPopular from "../components/ProductsPopular";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <ProductsPopular />
    </>
  );
};

export default Home;
