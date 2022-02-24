import React from "react";
import Categories from "../components/Categories";
import Products from "../components/Products";
import RequiredScreen from "../components/RequiredScreen";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <RequiredScreen />
      <Slider />
      <Categories />
      <Products />
    </>
  );
};

export default Home;
