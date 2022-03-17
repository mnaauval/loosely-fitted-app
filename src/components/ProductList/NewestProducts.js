import { useEffect, useState } from "react";
import styled from "styled-components";
import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getTotal } from "../../redux/features/cartSlice";
import { publicRequest } from "../../utilities/requestMethods";
import QuickViewModal from "../Modal/QuickViewModal";
import Swal from "sweetalert2";
import SizeColorModal from "../Modal/SizeColorModal";

const Icon = styled.button`
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

const NewestProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { isLoggedOut } = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [newestProducts, setNewestProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`products/`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setNewestProducts(products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }, [products]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const openModal = () => {
    setShowModal((prev) => !prev);
    console.log(showModal);
  };

  // const getData = (id, imageUrl, title, desc, price, color, size) => {
  //   let currentTempData = [id, imageUrl, title, desc, price, color, size];
  //   setTempData((item) => [1, ...currentTempData]);
  //   console.log(tempData);
  //   return setShowModal(true);
  // };
  const getData = (id) => {
    let currentTempData = [id];
    setTempData((item) => [1, ...currentTempData]);
    console.log(tempData);
    return setShowModal(true);
  };

  const handleAddToCart = (product) => {
    dispatch(addCart({ ...product, color, size }));
    Swal.fire({
      text: "Cart added",
      icon: "success",
      timer: 1500,
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <h3 className="md:text-4xl text-2xl font-bold">New Arrival</h3>
      </div>
      <div className="p-5 xs:flex hidden flex-wrap justify-between">
        {newestProducts.map((product) => (
          // <NavLink to={`/product/${product._id}`}>
          <div key={product._id} className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative">
            <div className="w-52 h-52 rounded-full bg-white absolute"></div>
            <img src={product.imageUrl} alt={product.title} className="h-3/4 z-[2]" />
            <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100">
              {isLoggedOut ? (
                <>
                  <Icon onClick={() => navigate("/login")}>
                    <ShoppingCartOutlined />
                  </Icon>
                  <Icon onClick={() => navigate("/login")}>
                    <Visibility />
                  </Icon>
                  <Icon onClick={() => navigate("/login")}>
                    <FavoriteBorderOutlined />
                  </Icon>
                </>
              ) : (
                <>
                  <Icon
                    onClick={() => {
                      handleAddToCart(product);
                      openModal();
                      getData(product._id);
                    }}
                  >
                    <ShoppingCartOutlined />
                  </Icon>
                  <Icon onClick={() => navigate(`/product/${product._id}`)}>
                    <Visibility />
                  </Icon>
                  <Icon>
                    <FavoriteBorderOutlined />
                  </Icon>
                </>
              )}
            </div>
          </div>
          // </NavLink>
        ))}

        {/* {showModal === true ? <QuickViewModal id={tempData[1]} imageUrl={tempData[2]} title={tempData[3]} desc={tempData[4]} price={tempData[5]} color={tempData[6]} size={tempData[7]} close={() => setShowModal(false)} /> : ""} */}
        {/* <QuickViewModal id={tempData[1]} imageUrl={tempData[2]} title={tempData[3]} desc={tempData[4]} price={tempData[5]} color={tempData[6]} size={tempData[7]} showModal={showModal} setShowModal={setShowModal} /> */}
        <SizeColorModal id={tempData[1]} showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default NewestProducts;
