import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RequiredScreen from "../components/RequiredScreen";
import { publicRequest } from "../utilities/requestMethods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
`;

const Input = styled.input`
  min-width: 50%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const Register = () => {
  toast.configure();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const newRegister = async () => {
    try {
      const res = await publicRequest.post("auth/register", { username, email, password });
      console.log(res);
      window.location.reload();
      toast("Register Success", { type: "success" });
    } catch (error) {
      // alert(error);
      toast(`Register Failed: ${error}`, { type: "error" });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    newRegister();
  };

  return (
    <>
      <RequiredScreen />
      <Container className="w-screen h-screen bg-cover xs:flex hidden items-center justify-center overflow-hidden">
        <div className="w-auto p-5 bg-white">
          <form className="flex items-center justify-center flex-col">
            <h1 className="text-2xl">CREATE AN ACCOUNT</h1>
            {/* <div className="sm:flex hidden ">
              <Input type="text" placeholder="First Name" />
              <Input type="text" placeholder="Last Name" />
            </div> */}
            {/* <Input className="sm:hidden" type="text" placeholder="First Name" />
            <Input className="sm:hidden" type="text" placeholder="Last Name" /> */}
            <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            {/* <Input type="password" placeholder="Confirm Password" /> */}
            <div className="flex items-start my-5">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-900 ">
                  I agree with the
                  <NavLink to="/register" className="text-blue-600 hover:underline ">
                    terms and conditions
                  </NavLink>
                </label>
              </div>
            </div>
            <button onClick={handleClick} type="submit" className="sm:w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer">
              CREATE
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Register;
