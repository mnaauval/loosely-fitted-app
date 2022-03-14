import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import RequiredScreen from "../components/Utilities/RequiredScreen";
import { login } from "../redux/features/userAPI";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <>
      <RequiredScreen />
      <Container className="w-screen h-screen bg-cover xs:flex hidden items-center justify-center">
        <div className="sm:w-2/5 w-auto p-5 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">
            <h1 className="text-2xl">LOGIN</h1>
            {/* <Input type="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} /> */}
            <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button disabled={isFetching} type="submit" className="sm:w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-teal-600">
              LOGIN
            </button>
            {error && <p className="text-red-500 text-xs italic mb-3 mt-1">Something went wrong...</p>}
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
