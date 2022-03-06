import { useState, useEffect } from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import RequiredScreen from "../components/RequiredScreen";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../utilities/requestMethods";
import { addProduct } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [product, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const { isLoggedOut } = useSelector((state) => state.user);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 0) {
      setQuantity(quantity - 1);
    } else if (type === "dec" && quantity === 0) {
      return 0;
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };
  const handlePopup = () => {
    navigate("/login");
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
            <div className="flex items-center">
              <span className="md:text-xl text-md font-semibold mr-5">Color: </span>
              {product.color?.map((c) => {
                return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
              })}
            </div>
            <div className="flex items-center sm:mx-10 mx-0 sm:my-0 my-5">
              <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Size: </span>
              <select onChange={(e) => setSize(e.target.value)} className="sm:p-2.5 px-2.5 py-1 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md">
                {product.size?.map((s) => {
                  return (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-center font-bold">
              <Remove className="cursor-pointer" onClick={() => handleQuantity("dec")} />
              <span className="w-[30px] h-[30px] rounded-md border-2 flex items-center justify-center my-0 mx-1">{quantity}</span>
              <Add className="cursor-pointer" onClick={() => handleQuantity("inc")} />
            </div>
          </div>
          {isLoggedOut ? (
            <button onClick={handlePopup} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4] disabled:cursor-not-allowed">
              ADD TO CART
            </button>
          ) : (
            <button onClick={handleClick} className="p-[15px] border-2 border-teal-700 rounded-md bg-white cursor-pointer font-medium hover:bg-[#f8f4f4]">
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
