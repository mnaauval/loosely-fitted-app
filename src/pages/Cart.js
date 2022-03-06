import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import RequiredScreen from "../components/RequiredScreen";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../utilities/requestMethods";

const KEY = "pk_test_51KXNo4BnzSnZyZ7MtFcoNl1vypU22HmTC7WX76PKoDv1dpgy7hTMGToL3xA9F1nQyRirNVq04onkz5Ah4rK2pUEc002vRANYoZ";

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
  const cart = useSelector((state) => state.cart);
  toast.configure();
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const shipping = 30;
  const discount = -30;
  const tax = 30;

  const handleToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: (cart.totalPrice + shipping + discount + tax) * 100,
        });
        console.log(res.data);
        console.log(res.status);
        toast("Successful payment", { type: "success" });
        navigate("/success", {
          state: {
            stripeData: res.data,
            cart: cart,
          },
        });
      } catch (e) {
        console.log(e);
        toast("Payment failed", { type: "error" });
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice, navigate]);

  const clickHandler = (e) => {
    navigate("/products");
  };

  return (
    <>
      <RequiredScreen />

      {stripeToken ? (
        <div className="flex items-center justify-center py-80">
          <span className="text-center">Processing. . .</span>
        </div>
      ) : (
        <div className="sm:p-5 p-2.5 xs:block hidden">
          <h1 className="text-4xl font-light text-center">YOUR CART</h1>
          {/* Top */}
          <div className="flex items-center sm:justify-between justify-center p-5">
            <div className="sm:flex flex-col items-center hidden">
              <span className="underline cursor-pointer my-0 mx-2.5">Shopping Bag {2}</span>
              <span className="underline cursor-pointer my-0 mx-2.5">Your Wishlist {2}</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-between sm:flex-row flex-col">
            {/* Cart List */}
            <div className="grow-[3]">
              {cart.products.map((product) => (
                <div className="flex justify-between sm:flex-row flex-col">
                  {/* Detail Product */}
                  <div className="grow-[2] flex">
                    <img src={product.imageUrl} alt="shoes" className="w-[200px]" />
                    <div className="p-5 flex flex-col justify-around">
                      <span>
                        <b>Product: </b> {product.title}
                      </span>
                      <span>
                        <b>ID: </b> {product._id}
                      </span>
                      <span>
                        <b>Size: </b> {product.size}
                      </span>
                      <ProductColor color={product.color} className="w-[20px] h-[20px] rounded-full"></ProductColor>
                    </div>
                  </div>
                  {/* Detail Price */}
                  <div className="flex-1 flex items-center justify-center py-2">
                    <div className="flex items-center font-bold mx-2">
                      <Remove className="cursor-pointer" />
                      <span className="w-[30px] h-[30px] rounded-md border-2 flex items-center justify-center my-0 mx-1">{product.quantity}</span>
                      <Add className="cursor-pointer" />
                    </div>
                    <span className="text-3xl font-thin mx-2">{product.price * product.quantity}</span>
                  </div>
                </div>
              ))}
              <hr className="bg-[#eee] border-none h-1 my-2" />
            </div>

            {/* Summary */}
            <div className=" border-4 border-gray-400 rounded-md p-5 ">
              <h1 className="text-4xl font-light text-center">ORDER SUMMARY</h1>
              <SummaryItem className="my-8 mx-0 flex justify-between">
                <span>Sutotal</span>
                <span>$ {cart.totalPrice}</span>
              </SummaryItem>
              <SummaryItem className="my-8 mx-0 flex justify-between">
                <span>Shipping</span>
                <span>{`$30`}</span>
              </SummaryItem>
              <SummaryItem className="my-8 mx-0 flex justify-between">
                <span>Discount</span>
                <span>{`-$30`}</span>
              </SummaryItem>
              <SummaryItem className="my-8 mx-0 flex justify-between">
                <span>Tax</span>
                <span>{`$30`}</span>
              </SummaryItem>
              <SummaryItem type="total" className="my-8 mx-0 flex justify-between">
                <span>Total</span>
                <span>$ {cart.totalPrice + shipping + discount + tax}</span>
              </SummaryItem>
              {/* prettier-ignore */}
              <StripeCheckout 
            stripeKey={KEY} 
            token={handleToken} 
            name="Loosely Fitted" 
            image="https://avatars.githubusercontent.com/u/22863499?s=400&u=8fd1ee58d8bb34d6a38db1a2905ecbc6df4eda11&v=4" 
            billingAddress 
            shippingAddress 
            description={`Your total is $${cart.totalPrice + shipping + discount + tax}`} 
            amount={(cart.totalPrice + shipping + discount + tax) * 100}>
              <Button type="filled" className="p-2.5 font-bold cursor-pointer border-2 border-gray-500 w-full">
                CHECKOUT NOW
              </Button>
            </StripeCheckout>
            </div>
          </div>

          <div className="sm:block flex items-center justify-center sm:mt-0 mt-10 mb-5">
            <Button onClick={clickHandler} className="p-2.5 font-bold cursor-pointer border-2 border-gray-500">
              CONTINUE SHOPPING
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
