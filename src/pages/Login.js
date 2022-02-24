import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const Login = () => {
  return (
    <Container className="w-screen h-screen bg-cover flex items-center justify-center">
      <div className="sm:w-2/5 w-3/4 p-5 bg-white">
        <h1 className="text-2xl">LOGIN</h1>
        <form action="" className="flex flex-wrap py-5">
          <Input type="text" placeholder="Username" />
          <Input type="text" placeholder="Password" />
        </form>
        <div className="flex items-center justify-center">
          <button className="w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer">LOGIN</button>
        </div>
        <div className="flex flex-col mt-10">
          <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="login">
            FORGET YOUR PASSWORD?
          </NavLink>
          <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="register">
            DO NOT HAVE ACCOUNT?
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Login;
