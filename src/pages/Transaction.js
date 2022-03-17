import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RequiredScreen from "../components/Utilities/RequiredScreen";
import { userRequest } from "../utilities/requestMethods";

const ProgressBar = styled.div`
  width: ${(props) => props.width};
`;
const ProgressTitle = styled.div`
  transform: ${(props) => props.translate};
`;

const Transaction = () => {
  const [orders, setOrders] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get(`orders/find/${currentUser._id}`);
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  // const width = "25%";

  return (
    <div className="bg-[#F9FAFB]">
      <RequiredScreen />
      <div className="sm:p-8 px-0 py-2.5 xs:block hidden">
        {orders.map((order) => (
          <div key={order._id} className="my-12">
            <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between mb-3.5 px-2.5">
              <h2 className="md:text-3xl text-xl font-bold mb-1.5">{`Order #${order._id}`}</h2>
              <p>
                Order placed <b>{order.createdAt.substr(0, 10)}</b>
              </p>
            </div>
            <div className="p-8 bg-white sm:rounded-lg border border-gray-300 divide-y divide-gray-300">
              <div className="md:grid grid-cols-6 gap-4 mb-8">
                <div className="bg-[#F7F7F7] rounded-lg aspect-square">
                  <img src={`https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png`} alt={`https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png`} className="object-cover object-center" />
                </div>
                <div className="col-span-3 sm:mt-0 mt-5">
                  <h2 title={order.products[0].productId} className="text-2xl truncate md:max-w-[500px] max-w-[300px]">
                    {order.products[0].productId}
                  </h2>
                  <p className="text-2xl text-gray-900 mt-2">$ {order.amount}</p>
                  <p>
                    {order.products[0].quantity} items x $ {123}
                  </p>
                  <p className="mt-2.5">+ {order.products.length} other items</p>
                </div>
                <div className="sm:mt-0 mt-5 flex flex-col justify-center border-l border-gray-300 pl-5 h-1/2">
                  <p>Total amount</p>
                  <p className="text-lg">
                    <b>$ {order.amount}</b>
                  </p>
                </div>
                <div className="sm:mt-0 mt-5">
                  <p className="text-lg">
                    <b>Adress</b>
                  </p>
                  <p>
                    {order.address.line1}, {order.address.postal_code}
                  </p>
                  <p>{order.address.city}</p>
                  <p>{order.address.country}</p>
                </div>
              </div>
              <div className="">
                <p className="mt-5 font-semibold text-lg">Shipping in progress</p>
                <div className="relative mt-4">
                  <div className="flex items-center">
                    <ProgressTitle translate="translateX(0%)" className="w-full absolute top-full ">
                      <p>Packaging</p>
                    </ProgressTitle>
                    <ProgressTitle translate="translateX(35%)" className="w-full -ml-8 absolute top-full ">
                      <p>Processing</p>
                    </ProgressTitle>
                    <ProgressTitle translate="translateX(65%)" className="w-full -ml-8 absolute top-full ">
                      <p>Shipping</p>
                    </ProgressTitle>
                    <ProgressTitle translate="translateX(100%)" className="w-full -ml-16 absolute top-full ">
                      <p>Delivered</p>
                    </ProgressTitle>
                  </div>
                  <div className="overflow-hidden h-4 my-2.5 text-xs flex rounded-full bg-amber-200">
                    <>
                      {order.status === "pending" ? (
                        <ProgressBar width="0%" className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></ProgressBar>
                      ) : order.status === "processing" ? (
                        <ProgressBar width="35%" className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></ProgressBar>
                      ) : order.status === "shipping" ? (
                        <ProgressBar width="65%" className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></ProgressBar>
                      ) : order.status === "delivered" ? (
                        <ProgressBar width="100%" className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-600"></ProgressBar>
                      ) : null}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
