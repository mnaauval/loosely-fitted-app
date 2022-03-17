import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateColorSize } from "../../redux/features/cartSlice";
import { publicRequest } from "../../utilities/requestMethods";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const SizeColorModal = ({ id, showModal, setShowModal }) => {
  const [product, setProducts] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  useEffect(() => {
    dispatch(updateColorSize({ ...product, color, size }));
  }, [color, size]);

  const handleUpdate = (product) => {
    dispatch(updateColorSize({ ...product, color, size }));
  };

  const modalRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div key={id} className="overflow-y-auto flex items-center justify-center fixed inset-0 z-50 bg-black/80" ref={modalRef} onClick={closeModal}>
          <div className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-lg transform transition-all sm:my-6 sm:align-middle sm:max-w-[800px] sm:w-auto ">
            {/* Content Wrapper */}
            <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              {/* Button X */}
              <button onClick={() => setShowModal(false)} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                <CloseOutlinedIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Content Container */}
              <div className="w-full grid grid-cols-1 gap-y-3.5 gap-x-12 items-start">
                <div className="col-span-8">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">Pick Color and Size</h2>
                  <div className="">
                    <span className="block md:text-xl text-md font-semibold mb-2.5">Color </span>
                    {/* <div className="flex">
                      <FilterColor color={color} className="w-[30px] h-[30px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                    </div> */}
                    <div className="flex">
                      {product.color?.map((c) => {
                        return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[30px] h-[30px] rounded-full my-0 mx-1 cursor-pointer border-2 border-gray-200"></FilterColor>;
                      })}
                    </div>
                  </div>
                  <div className="mt-7">
                    <span className="block md:text-xl text-md font-semibold mb-2.5">Size </span>
                    {/* <button className=" px-2.5 py-1.5 mt-1.5 mr-5 border-2 border-gray-400 rounded-md w-16">{size}</button> */}
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
                  {/* <button onClick={() => handleUpdate(product)} className="w-full  px-2.5 py-2 border-2 bg-teal-600 mt-5 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700">
                    Update product
                  </button> */}
                  <button onClick={() => setShowModal(false)} className="w-full  px-2.5 py-2 border-2 bg-teal-600 mt-5 rounded-md text-white  cursor-pointer font-medium hover:bg-teal-700">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SizeColorModal;
