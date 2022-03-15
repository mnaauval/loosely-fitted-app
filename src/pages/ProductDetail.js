import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../utilities/requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getTotal, updateColorSize } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequiredScreen from "../components/Utilities/RequiredScreen";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  toast.configure();
  const { isLoggedOut } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [product, setProducts] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

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
  const handleUpdate = (product) => {
    dispatch(updateColorSize({ ...product, color, size }));
  };

  const handleColor = (c) => {
    alert("You pick " + c);
    setColor(c);
  };

  return (
    <>
      <RequiredScreen />
      <div className="sm:p-12 p-2.5 xs:flex hidden md:flex-row flex-col ">
        <div className="flex-1 bg-[#f5fbfd]  rounded-xl">
          <img src={product?.imageUrl} alt={product.title} className="w-full sm:h-[90vh] h-[40vh] object-cover" />
        </div>

        <div className="flex-1 md:px-12 md:py-0 p-2.5">
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">{product?.title}</h1>
            <span className="font-bold text-4xl">$ {product?.price}</span>
          </div>
          <div className="mt-10">
            <p className="text-gray-900 text-justify">{product?.desc}</p>
          </div>
          <div className="sm:w-1/2 w-full my-8 mx-0">
            {isLoggedOut ? (
              <>
                <span className="md:text-xl text-md font-semibold ">Color: </span>
                <span className="md:text-xl text-md font-semibold mt-7">Size: </span>
              </>
            ) : (
              <>
                <div className="">
                  <span className="block md:text-xl text-md font-semibold mb-2.5">Color </span>
                  <div className="flex">
                    {product.color?.map((c) => {
                      return <FilterColor key={c} color={c} onClick={() => handleColor(c)} className="w-[30px] h-[30px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                    })}
                  </div>
                </div>
                <div className="mt-7">
                  <span className="block md:text-xl text-md font-semibold mb-2.5">Size </span>
                  <select onChange={(e) => setSize(e.target.value)} className="sm:p-2.5 px-2.5 py-1 border-2 border-gray-400 rounded-md">
                    <option selected disabled>
                      Pick Size
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
              </>
            )}
          </div>

          <div className="flex justify-center">
            {isLoggedOut ? (
              <button onClick={() => navigate("/login")} className="w-full p-[15px] border-2 bg-teal-600 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700 disabled:cursor-not-allowed">
                ADD TO CART
              </button>
            ) : !color ? (
              <button onClick={() => alert("Please choose a COLOR ")} className="w-full p-[15px] border-2 bg-teal-600 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700">
                ADD TO CART
              </button>
            ) : !size ? (
              <button onClick={() => alert("Please choose a SIZE ")} className="w-full p-[15px] border-2 bg-teal-600 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700">
                ADD TO CART
              </button>
            ) : (
              <button onClick={() => handleAddToCart(product)} className="w-full p-[15px] border-2 bg-teal-600 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700">
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
