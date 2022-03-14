import React from "react";
import Categories from "../components/Categories";
import NewestProducts from "../components/ProductList/NewestProducts";
import Slider from "../components/Slider";
import RequiredScreen from "../components/Utilities/RequiredScreen";

const Home = () => {
  return (
    <>
      <RequiredScreen />
      <Slider />
      <Categories />
      <NewestProducts />
    </>
  );
};

export default Home;
