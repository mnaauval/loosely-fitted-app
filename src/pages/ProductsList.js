import React from "react";
import Products from "../components/Products";

const ProductsList = () => {
  return (
    <div className="sm:p-5 p-2.5">
      <h1 className="mb-5 text-4xl">Dresses</h1>
      <div className="flex justify-between">
        <div className="m-5 flex sm:flex-row flex-col sm:items-center">
          <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Filter Products:</span>
          <select className="p-2.5 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md">
            <option defaultValue="White" disabled>
              Color
            </option>
            <option value="">White</option>
            <option value="">Black</option>
            <option value="">Red</option>
            <option value="">Blue</option>
            <option value="">Yellow</option>
            <option value="">Green</option>
          </select>
          <select className="sm:p-2.5 px-2.5 py-2.5 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md">
            <option defaultValue="XS" disabled>
              Size
            </option>
            <option value="">XS</option>
            <option value="">S</option>
            <option value="">M</option>
            <option value="">L</option>
            <option value="">XL</option>
          </select>
        </div>
        <div className="m-5 flex sm:flex-row flex-col sm:items-center">
          <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Sort Products:</span>
          <select className="p-2.5 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md">
            <option defaultValue="Newest">Newest</option>
            <option value="">Price (asc)</option>
            <option value="">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductsList;
