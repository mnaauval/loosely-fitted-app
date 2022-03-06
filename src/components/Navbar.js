import React from "react";
import { Disclosure } from "@headlessui/react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Announcement from "./Announcement";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";

const navigation = [
  { name: "Register", path: "/register" },
  { name: "Sign-in", path: "/login" },
];

const navigation2 = [{ name: "Products", path: "/products" }];

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const { isLoggedOut } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Announcement />
      <div className="h-full border border-x border-sm xs:block hidden">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Langugage */}
                  {/* <select className="md:block hidden">
                    <option value="IN">IN</option>
                    <option value="EN">EN</option>
                  </select> */}

                  {/* Search */}
                  <div className="flex flex-1 ">
                    <div className="flex items-center ml-5 px-2 py-1 border-2 border-gray-300">
                      <input type="search" className="border-none md:max-w-full max-w-[100px] focus:outline-none" placeholder="Search" />
                      <SearchIcon className="w-5 h-5 ml-1 text-gray-500" />
                    </div>
                  </div>

                  {/* Brand */}
                  <div className="sm:flex hidden flex-1 mx-5">
                    <NavLink to="/">
                      <h1 className="text-4xl underline">LooFi</h1>
                    </NavLink>
                  </div>

                  <div className="flex items-center justify-end">
                    {/* Navigation */}
                    {isLoggedOut ? (
                      <div className="sm:block hidden">
                        <div className="flex items-center space-x-10">
                          {navigation.map((nav) => (
                            <NavLink key={nav.name} to={nav.path} className="text-blue-storial">
                              {nav.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="sm:block hidden">
                          <div className="flex items-center space-x-10">
                            {navigation2.map((nav) => (
                              <NavLink key={nav.name} to={nav.path} className="text-blue-storial">
                                {nav.name}
                              </NavLink>
                            ))}
                            <span onClick={logoutHandler} className="cursor-pointer">
                              Logout
                            </span>
                          </div>
                        </div>
                        <NavLink to="/cart" className="flex items-center pl-10 pr-5">
                          <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartIcon className="text-gray-500" />
                          </Badge>
                        </NavLink>
                      </>
                    )}

                    {/* Mobile Navigation */}
                    <div className="sm:hidden block ">
                      <Disclosure.Button className="p-2 ">{open ? <CloseIcon className="" /> : <MenuIcon className="" />}</Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <Disclosure.Panel className="sm:hidden block bg-white">
                {isLoggedOut ? (
                  <div className="pb-5 mt-2 px-2 shadow-md">
                    <Disclosure.Button as={NavLink} to="/">
                      <h1 className="text-3xl text-center py-2 underline">LooFi</h1>
                    </Disclosure.Button>
                    {navigation.map((nav) => (
                      <Disclosure.Button key={nav.name} as={NavLink} to={nav.path} className="block px-3 py-2 font-medium text-center">
                        {nav.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                ) : (
                  <div className="pb-5 mt-2 px-2 shadow-md">
                    <Disclosure.Button as={NavLink} to="/">
                      <h1 className="text-3xl text-center py-2 underline">LooFi</h1>
                    </Disclosure.Button>
                    {navigation2.map((nav) => (
                      <Disclosure.Button key={nav.name} as={NavLink} to={nav.path} className="block px-3 py-2 font-medium text-center">
                        {nav.name}
                      </Disclosure.Button>
                    ))}
                    <span onClick={logoutHandler} className="block px-3 py-2 font-medium text-center cursor-pointer">
                      Logout
                    </span>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Navbar;
