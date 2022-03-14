import { useCallback, useEffect, useRef } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import styled from "styled-components";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const QuickViewModal = ({ id, imageUrl, title, desc, price, color, size, showModal, setShowModal }) => {
  const modalRef = useRef();

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
          {/* Modal Wrapper */}
          <div className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-lg transform transition-all sm:my-6 sm:align-middle sm:max-w-[800px] sm:w-auto ">
            {/* Content Wrapper */}
            <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              {/* Button X */}
              <button onClick={() => setShowModal(false)} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
                <CloseOutlinedIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {/* Content Container */}
              <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8 bg-[#f5fbfd]">
                {/* Image */}
                <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                  <img src={imageUrl} alt={title} className="object-cover object-center" />
                </div>
                {/* Product Info */}
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{title}</h2>
                  <section className="mt-2">
                    <p className="text-2xl text-gray-900">$ {price}</p>
                  </section>
                  <section className="mt-2">
                    <p className="text-gray-900 text-justify">{desc}</p>
                  </section>
                  <section aria-labelledby="options-heading" className="mt-6">
                    <div>
                      <h3 className="text-md text-gray-900 font-medium">Color</h3>
                      <div className="flex items-center">
                        {color.map((c) => {
                          // return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                          return <FilterColor key={c} color={c} className="w-[30px] h-[30px] rounded-full my-0 mx-1 mt-1.5 cursor-pointer"></FilterColor>;
                        })}
                      </div>
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg text-gray-900 font-medium">Size</h3>
                      {size.map((s) => {
                        return <button className=" px-2.5 py-1.5 mt-1.5 mr-5 border-2 border-gray-400 rounded-md w-16">{s}</button>;
                      })}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QuickViewModal;
