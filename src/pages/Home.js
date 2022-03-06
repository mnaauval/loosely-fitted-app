import React from "react";
import Categories from "../components/Categories";
import NewestProducts from "../components/NewestProducts";
import RequiredScreen from "../components/RequiredScreen";
import Slider from "../components/Slider";

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
