import React, { Component } from "react";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

export default class QuickViewModal extends Component {
  render() {
    return (
      <div className="overflow-y-auto flex items-center justify-center fixed inset-0 z-50 bg-black/80">
        {/* Modal Wrapper */}
        <div className="relative inline-block align-bottom rounded-lg text-left overflow-hidden shadow-lg transform transition-all sm:my-6 sm:align-middle sm:max-w-[800px] sm:w-auto ">
          {/* Content Wrapper */}
          <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            {/* Button X */}
            <button onClick={this.props.close} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8">
              <CloseOutlinedIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Content Container */}
            <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
              {/* Image */}
              {/* <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5"> */}
              <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                <img src={this.props.imageUrl} alt={this.props.title} className="object-cover object-center" />
              </div>
              {/* Product Info */}
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{this.props.title}</h2>
                <section className="mt-2">
                  <p className="text-2xl text-gray-900">$ {this.props.price}</p>
                </section>
                <section className="mt-2">
                  <p className="text-gray-900 text-justify">{this.props.desc}</p>
                </section>
                <section aria-labelledby="options-heading" className="mt-10">
                  <div>
                    <h3 className="text-md text-gray-900 font-medium">Color</h3>
                    <div className="flex items-center">
                      {this.props.color.map((c) => {
                        // return <FilterColor key={c} color={c} onClick={() => setColor(c)} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                        return <FilterColor key={c} color={c} className="w-[20px] h-[20px] rounded-full my-0 mx-1 cursor-pointer"></FilterColor>;
                      })}
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-md text-gray-900 font-medium">Size</h3>
                    {/* <select onChange={(e) => setSize(e.target.value)} className="sm:p-2.5 px-2.5 py-1 sm:mr-5 mr-0 ml-2.5 border-2 border-gray-400 rounded-md"> */}
                    <select className="sm:p-2.5 px-2.5 py-1 sm:mr-5 border-2 border-gray-400 rounded-md">
                      {this.props.size.map((s) => {
                        return (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* OK Wrapper */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={this.props.close} type="button" className="w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}
