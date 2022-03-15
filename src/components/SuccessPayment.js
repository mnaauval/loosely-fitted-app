import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../utilities/requestMethods";
import { clearCart } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  toast.configure();

  const { stripeData, cart } = location.state;
  const { currentUser } = useSelector((state) => state.user);

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("orders/", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.totalPrice,
          address: stripeData.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(clearCart());
        toast("Order success", { type: "success" });
      } catch (error) {
        console.log(error);
        toast("Order failed", { type: "error" });
      }
    };
    stripeData && createOrder();
  }, [cart, stripeData, currentUser]);

  return (
    <div className="flex items-center justify-center py-80">
      {orderId ? (
        <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-green-500">
              <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="text-sm font-medium ml-3">Success Payment.</div>
          </div>
          <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">{`Your Payment was Successful. Your order number is ${orderId}`}</div>
          <div onClick={() => navigate("/")} className="absolute sm:relative sm:top-auto sm:right-auto ml-5 right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      ) : (
        `Your order is being prepared...`
      )}
    </div>
  );
};

export default SuccessPayment;
