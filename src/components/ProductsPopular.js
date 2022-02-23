import React from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { popularProducts } from "../data";

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductsPopular = () => {
  return (
    <div className="p-5 flex flex-wrap justify-between">
      {popularProducts.map((product) => (
        <div key={product.id} className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative">
          <div className="w-52 h-52 rounded-full bg-white absolute"></div>
          <img src={product.img} alt={product.id} className="h-3/4 z-[2]" />
          <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100">
            <Icon>
              <ShoppingCartOutlinedIcon />
            </Icon>
            <Icon>
              <SearchOutlinedIcon />
            </Icon>
            <Icon>
              <FavoriteBorderOutlinedIcon />
            </Icon>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPopular;
