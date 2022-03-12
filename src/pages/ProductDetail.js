import { useState, useEffect } from "react";
import styled from "styled-components";
// import { Add, Remove } from "@mui/icons-material";
import RequiredScreen from "../components/RequiredScreen";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest, userRequest } from "../utilities/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addCart, decreaseCart, getTotal, increaseCart, submitCart, updateColorSize } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  toast.configure();

  const [product, setProducts] = useState({});
  // const [carts, setCarts] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
  const { isLoggedOut } = useSelector((state) => state.user);
  // const { currentUser } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProducts(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  useEffect(() => {
    if (color && size) {
      dispatch(updateColorSize({ ...product, color, size }));
    }
  }, [color, size]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addCart({ ...product, color, size }));
  };

  return (
    <>
      <RequiredScreen />
      <div className="sm:p-12 p-2.5 xs:flex hidden md:flex-row flex-col ">
        <div className="flex-1">
          <img src={product?.imageUrl} alt="Denim Jumpshoot" className="w-full sm:h-[90vh] h-[40vh] object-cover" />
        </div>

        <div className="flex-1 md:px-12 md:py-0 p-2.5">
          <h1 className="font-light text-4xl">{product?.title}</h1>
          <p className="my-5 mx-0 text-justify">{product?.desc}</p>
          <span className="font-extralight text-[40px]">$ {product?.price}</span>
          <div className="sm:w-1/2 w-full my-8 mx-0 flex justify-between sm:flex-row flex-col">
            {isLoggedOut ? (
              <>
                <div className="flex items-center">
                  <span className="md:text-xl text-md font-semibold mr-5">Color: </span>
                </div>
                <div className="flex items-center sm:mx-10 mx-0 sm:my-0 my-5">
                  <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Size: </span>
                </div>
                {/* <div className="flex items-center font-bold"></div> */}
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="md:text-xl text-md font-semibold mr-5">Color: </span>
                  {product.color?.map((c) => {
                    return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                  })}
                </div>
                <div className="flex items-center sm:mx-10 mx-0 sm:my-0 my-5">
                  <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Size: </span>
                  <select onChange={(e) => setSize(e.target.value)} className="sm:p-2.5 px-2.5 py-1 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md">
                    <option selected disabled>
                      Size
                    </option>
                    {product.size?.map((s) => {
                      return (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/* <div className="flex items-center font-bold">
                  <Remove onClick={() => handleDecreaseQuantity(product)} className="cursor-pointer" />
                  {cart.products?.map((item) => (
                    <span key={item._id} className="w-[30px] h-[30px] rounded-md border-2 flex items-center justify-center my-0 mx-1">
                      {item.quantity}
                    </span>
                  ))}
                  <Add onClick={() => handleIncreaseQuantity(product)} className="cursor-pointer" />
                </div> */}
              </>
            )}
          </div>
          {isLoggedOut ? (
            <button onClick={() => navigate("/login")} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4] disabled:cursor-not-allowed">
              ADD TO CART
            </button>
          ) : !color ? (
            <button onClick={() => alert("Please choose a COLOR ")} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4]">
              ADD TO CART
            </button>
          ) : !size ? (
            <button onClick={() => alert("Please choose a SIZE ")} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4]">
              ADD TO CART
            </button>
          ) : (
            <button onClick={() => handleAddToCart(product)} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4]">
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
