import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { Add, Remove } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { publicRequest } from "../utilities/requestMethods";
import { decreaseCart, getTotal, increaseCart, removeFromCart, updateColorSize } from "../redux/features/cartSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RequiredScreen from "../components/Utilities/RequiredScreen";
import SizeColorModal from "../components/Modal/SizeColorModal";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  toast.configure();
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState([]);

  const shipping = 30;
  const discount = -15;
  const tax = 30;

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const openModal = () => {
    setShowModal((prev) => !prev);
    // console.log(showModal);
  };
  const getData = (id) => {
    let currentTempData = [id];
    setTempData((item) => [1, ...currentTempData]);
    // console.log(tempData);
    return setShowModal(true);
  };

  const handleToken = (token) => {
    setStripeToken(token);
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseCart(product));
  };
  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(decreaseCart(product));
    } else if (product.quantity === 1) {
      Swal.fire({
        title: "Are you sure?",
        html: `<b>${product.title}</b> will be deleted from cart`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(removeFromCart(product));
        }
      });
    }
  };
  const handleRemoveItem = (product) => {
    Swal.fire({
      title: "Are you sure?",
      html: `<b>${product.title}</b> will be deleted from cart`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(removeFromCart(product));
      }
    });
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: (cart.totalPrice + shipping + discount + tax) * 100,
        });
        console.log(res.data);
        // console.log(res.status);
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
          <div className="flex items-center sm:justify-between justify-center py-5">
            <div className="sm:flex flex-col items-center hidden">
              {/* <span className="underline cursor-pointer my-0 mx-2.5">Shopping Bag {cart.products.length}</span> */}
              <span className="underline cursor-pointer my-0">Your Wishlist {2}</span>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-between lg:flex-row flex-col">
            {/* Cart List */}
            <div className="grow-[3] ">
              {cart.products?.map((product) => (
                <div key={product._id} className="mb-10">
                  <hr className="border border-[#eee] w-3/4 mb-10" />
                  <div className="flex md:items-start items-center justify-between md:flex-row flex-col mt-1">
                    {/* Detail Product */}
                    <div className="grow-[2] flex md:flex-row flex-col max-w-[800px]">
                      <img src={product.imageUrl} alt={product.title} className="md:max-h-[200px] max-h-[400px] min-w-[200px] md:w-28 bg-[#F7F7F7] mr-10 rounded-xl" />
                      <div className="flex flex-col justify-center w-full">
                        <div className="flex items-center">
                          <h2 title={product.title} className="text-2xl truncate max-w-[500px]">
                            {product.title}
                          </h2>
                          <button
                            onClick={() => {
                              openModal();
                              getData(product._id);
                            }}
                            className="md:block hidden ml-5"
                          >
                            <EditOutlinedIcon />
                          </button>
                        </div>
                        <div className="flex items-center text-lg">
                          <b className="text-base w-[70px]">Size: </b> {product.size}
                        </div>
                        <div className="flex items-center">
                          <b className=" w-[65px]">Color: </b> <ProductColor color={product.color} className="w-[30px] h-[30px] rounded-full my-0"></ProductColor>
                        </div>
                      </div>
                    </div>
                    {/* Detail Price */}
                    <div className="flex-1 flex flex-col items-center justify-center py-2">
                      <div className="flex flex-row items-center">
                        <button
                          onClick={() => {
                            openModal();
                            getData(product._id);
                          }}
                          className="md:hidden block"
                        >
                          <EditOutlinedIcon />
                        </button>
                        <button onClick={() => handleRemoveItem(product)} className="mr-5">
                          <DeleteOutlinedIcon />
                        </button>
                        <div className="flex items-center font-bold mx-2 border-2 rounded-lg border-[#eee] ">
                          <Remove onClick={() => handleDecreaseQuantity(product)} className="cursor-pointer p-1.5" />
                          <span className="w-[30px] h-[30px] rounded-md flex items-center justify-center my-0 mx-1 p-1.5">{product.quantity}</span>
                          <Add onClick={() => handleIncreaseQuantity(product)} className="cursor-pointer p-1.5" />
                        </div>
                      </div>
                      <span className="text-3xl font-thin mx-2">$ {product.price * product.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
              <hr className="bg-[#eee] border-none h-1 my-2" />
            </div>

            {/* Summary */}
            <div className="lg:inline-block flex items-center md:justify-end justify-center">
              <div className="border-4 border-gray-400 rounded-md p-5 max-h-[480px] max-w-[400px]">
                <h1 className="text-4xl font-light text-center">ORDER SUMMARY</h1>
                <SummaryItem className="my-8 mx-0 flex justify-between">
                  <span>Sutotal</span>
                  <span>$ {cart.totalPrice}</span>
                </SummaryItem>
                <SummaryItem className="my-8 mx-0 flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping}</span>
                </SummaryItem>
                <SummaryItem className="my-8 mx-0 flex justify-between">
                  <span>Discount</span>
                  <span>{discount}</span>
                </SummaryItem>
                <SummaryItem className="my-8 mx-0 flex justify-between">
                  <span>Tax</span>
                  <span>{tax}</span>
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
          </div>

          <div className="md:block flex items-center justify-center md:mt-0 mt-10 mb-5">
            <Button onClick={() => navigate("/products")} className="p-2.5 font-bold cursor-pointer border-2 border-gray-500">
              CONTINUE SHOPPING
            </Button>
          </div>
        </div>
      )}
      <SizeColorModal id={tempData[1]} showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Cart;
