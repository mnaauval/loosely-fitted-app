import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const Register = () => {
  return (
    <Container className="w-screen h-screen bg-cover flex items-center justify-center overflow-hidden">
      <div className="sm:w-2/5 w-3/4 p-5 bg-white">
        <h1 className="text-2xl">CREATE AN ACCOUNT</h1>
        <form action="" className="flex flex-wrap">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Last Name" />
          <Input type="text" placeholder="Username" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Password" />
          <Input type="text" placeholder="Confirm Password" />
        </form>
        <div className="flex items-start my-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300" required />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-900 ">
              I agree with the
              <NavLink to="/" className="text-blue-600 hover:underline ">
                terms and conditions
              </NavLink>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer">CREATE</button>
        </div>
      </div>
    </Container>
  );
};

export default Register;
