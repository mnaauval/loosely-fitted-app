import { Add, Remove } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
  :hover {
    background-color: ${(props) => (props.type === "filled" ? "transparent" : "black")};
    color: ${(props) => (props.type === "filled" ? "black" : "white")};
  }
`;

const ProductColor = styled.div`
  background-color: ${(props) => props.color};
`;

const SummaryItem = styled.div`
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const Cart = () => {
  return (
    <div className="sm:p-5 p-2.5">
      <h1 className="text-4xl font-light text-center">YOUR BAG</h1>
      {/* Top */}
      <div className="flex items-center sm:justify-between justify-center p-5">
        <Button className="p-2.5 font-bold cursor-pointer border-2 border-gray-500">CONTINUE SHOPPING</Button>
        <div className="sm:flex flex-col items-center hidden">
          <span className="underline cursor-pointer my-0 mx-2.5">Shopping Bag {2}</span>
          <span className="underline cursor-pointer my-0 mx-2.5">Your Wishlist {2}</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between sm:flex-row flex-col">
        {/* Cart List */}
        <div className="grow-[3]">
          <div className="flex justify-between sm:flex-row flex-col">
            {/* Detail Product */}
            <div className="grow-[2] flex">
              <img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" alt="shoes" className="w-[200px]" />
              <div className="p-5 flex flex-col justify-around">
                <span>
                  <b>Product: </b> TRAVEL SHOES
                </span>
                <span>
                  <b>ID: </b> 085708570857
                </span>
                <span>
                  <b>Size: </b> 44
                </span>
                <ProductColor color="black" className="w-[20px] h-[20px] rounded-full"></ProductColor>
              </div>
            </div>
            {/* Detail Price */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center font-bold mb-5">
                <Remove className="cursor-pointer" />
                <span className="w-[30px] h-[30px] rounded-md border-2 flex items-center justify-center my-0 mx-1">{1}</span>
                <Add className="cursor-pointer" />
              </div>
              <span className="text-3xl font-thin pb-5">{`$30`}</span>
            </div>
          </div>
          <hr className="bg-[#eee] border-none h-1" />
        </div>

        {/* Summary */}
        <div className="flex-1 border border-gray-400 rounded-md p-5 h-[70vh]">
          <h1 className="text-4xl font-light text-center">ORDER SUMMARY</h1>
          <SummaryItem className="my-8 mx-0 flex justify-between">
            <span>Sutotal</span>
            <span>{`$30`}</span>
          </SummaryItem>
          <SummaryItem className="my-8 mx-0 flex justify-between">
            <span>Shipping</span>
            <span>{`$30`}</span>
          </SummaryItem>
          <SummaryItem className="my-8 mx-0 flex justify-between">
            <span>Discount</span>
            <span>{`$-30`}</span>
          </SummaryItem>
          <SummaryItem className="my-8 mx-0 flex justify-between">
            <span>Tax</span>
            <span>{`$30`}</span>
          </SummaryItem>
          <SummaryItem type="total" className="my-8 mx-0 flex justify-between">
            <span>Total</span>
            <span>{`$60`}</span>
          </SummaryItem>
          <Button type="filled" className="p-2.5 font-bold cursor-pointer border-2 border-gray-500">
            CHECKOUT NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
