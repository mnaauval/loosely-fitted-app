import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../utilities/requestMethods";
import { updateColorSize } from "../redux/features/cartSlice";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const SizeModal = ({ showModal, setShowModal, currentId }) => {
  const cart = useSelector((state) => state.cart);

  const [product, setProducts] = useState({});
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  console.log(currentId);

  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${currentId}`);
        setProducts(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [currentId]);

  useEffect(() => {
    if (color && size) {
      dispatch(updateColorSize({ ...product, color, size }));
    }
  }, [color, size]);

  return (
    <>
      {showModal ? (
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setShowModal}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          Select size and color
                        </Dialog.Title>
                        <div className="flex items-center my-5">
                          <span className="md:text-xl text-md font-semibold mr-5">Color: </span>
                          {product.color?.map((c) => {
                            return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                          })}
                        </div>
                        <div className="flex items-center my-5">
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
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
                      OK
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      ) : null}
    </>
  );
};

export default SizeModal;
