import React from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const Product = () => {
  return (
    <div className="sm:p-12 p-2.5 flex md:flex-row flex-col ">
      <div className="flex-1">
        <img src="" alt="" className="w-full sm:h-[90vh] h-[40vh] object-cover" />
      </div>

      <div className="flex-1 md:px-12 md:py-0 p-2.5">
        <h1 className="font-light text-4xl">Denim Jumpsuit</h1>
        <p className="my-5 mx-0 text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id condimentum ac, volutpat ornare.</p>
        <span className="font-extralight text-[40px]">{`$ 20`}</span>
        <div className="sm:w-1/2 w-full my-8 mx-0 flex justify-between sm:flex-row flex-col">
          <div className="flex items-center">
            <span className="md:text-xl text-md font-semibold mr-5">Color: </span>
            <FilterColor color="black" className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>
            <FilterColor color="darkblue" className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>
            <FilterColor color="gray" className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>
          </div>
          <div className="flex items-center sm:mx-10 mx-0 sm:my-0 my-5">
            <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Size: </span>
            <select className="sm:p-2.5 px-2.5 py-1 sm:mr-5 mr-0 ml-2.5">
              <option defaultValue="Color" disabled>
                Size
              </option>
              <option value="">XS</option>
              <option value="">S</option>
              <option value="">M</option>
              <option value="">L</option>
              <option value="">XL</option>
            </select>
          </div>
          <div className="flex items-center font-bold">
            <Remove />
            <span className="w-[30px] h-[30px] rounded-md border-2 border-teal-700 flex items-center justify-center my-0 mx-1">{1}</span>
            <Add />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4]">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
