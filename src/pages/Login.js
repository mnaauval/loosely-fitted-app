import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RequiredScreen from "../components/RequiredScreen";

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
`;

const Input = styled.input`
  min-width: 40%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const Login = () => {
  return (
    <>
      <RequiredScreen />
      <Container className="w-screen h-screen bg-cover xs:flex hidden items-center justify-center">
        <div className="sm:w-2/5 w-auto p-5 bg-white">
          <form className="flex items-center justify-center flex-col">
            <h1 className="text-2xl">LOGIN</h1>
            <Input type="text" placeholder="Username" />
            <Input type="text" placeholder="Password" />
            <button type="submit" className="sm:w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer">
              LOGIN
            </button>
          </form>

          <div className="flex flex-col mt-6">
            <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="login">
              FORGET YOUR PASSWORD?
            </NavLink>
            <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="register">
              DO NOT HAVE ACCOUNT?
            </NavLink>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
