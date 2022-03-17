import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { clearCart } from "../redux/features/cartSlice";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Announcement from "./Announcement";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { publicRequest } from "../utilities/requestMethods";

const navigation = [
  { name: "Register", path: "/register" },
  { name: "Sign-in", path: "/login" },
];

const navigation2 = [
  { name: "Your Profile", path: "/" },
  { name: "Transaction", path: "/order" },
];

const Navbar = () => {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isLoggedOut, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  let setCategories = [];
  const arrCategories = [...new Set(products.map((item) => item.categories))];

  for (let i = 0; i < arrCategories.length; i++) {
    for (let j = 0; j < arrCategories[i].length; j++) {
      setCategories.push(arrCategories[i][j]);
      // console.log(arrCategories[i][j]);
    }
    // console.log("array ke " + i);
  }

  const newCategories = ["All", ...new Set(setCategories)];
  // console.log(newCategories);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCart);
    navigate("/");
  };
  return (
    <>
      <Announcement />
      <div className="h-full border border-x border-sm xs:block hidden">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="w-full mx-auto lg:px-8 sm:px-6 px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Langugage */}
                  {/* <select className="md:block hidden">
                    <option value="IN">IN</option>
                    <option value="EN">EN</option>
                  </select> */}

                  {/* Brand */}
                  <div className="sm:flex hidden flex-1 mx-5">
                    <NavLink to="/">
                      <h1 className="text-4xl underline">LooFi</h1>
                    </NavLink>
                  </div>

                  {/* Categories */}
                  {!isLoggedOut && (
                    <>
                      <Menu as="div" className="mx-10 sm:inline-block hidden relative z-10">
                        <Menu.Button className="flex rounded-full focus:outline-none ">Categories</Menu.Button>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute -left-1.5 w-40 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {newCategories.map((category) => (
                              <Menu.Item key={category}>
                                {({ active }) => (
                                  <NavLink to={`/products/${category}`} className={`${active ? "bg-transparent text-teal-600" : "text-gray-900"} inline-block text-center w-full py-2 text-md`}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <Menu as="div" className="sm:hidden inline-block relative z-10">
                        <Menu.Button className="flex rounded-full focus:outline-none ">
                          <CategoryIcon className="text-gray-500" />
                        </Menu.Button>
                        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                          <Menu.Items className="absolute -left-1.5 w-40 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {newCategories.map((category) => (
                              <Menu.Item key={category}>
                                {({ active }) => (
                                  <NavLink to={`/products/${category}`} className={`${active ? "bg-transparent text-teal-600" : "text-gray-900"} inline-block text-center w-full py-2 text-md`}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}

                  {/* Search */}
                  <div className="flex flex-1 ">
                    <div className="flex items-center ml-5 px-2 py-1 border-2 border-gray-300">
                      <input type="search" className="border-none md:max-w-full max-w-[100px] focus:outline-none" placeholder="Search" />
                      <SearchIcon className="w-5 h-5 ml-1 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    {/* Navigation */}
                    {isLoggedOut ? (
                      <div className="sm:block hidden">
                        <div className="flex items-center space-x-10">
                          {navigation.map((nav) => (
                            <NavLink key={nav.name} to={nav.path}>
                              {nav.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Cart Icon */}
                        <NavLink to="/cart" className="flex items-center pl-10 pr-5 mt-1.5">
                          <Badge badgeContent={totalQuantity} color="primary">
                            <ShoppingCartIcon className="text-gray-500" />
                          </Badge>
                        </NavLink>
                        {/* Profile Icon*/}
                        <Menu as="div" className="sm:block hidden mx-3.5 relative z-10">
                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                            <div className="w-8 h-8">
                              <img className="w-full rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" />
                            </div>
                          </Menu.Button>
                          <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute -right-1.5 w-56 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <p className="text-center mb-3.5">{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</p>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink to="/" className={`${active ? "bg-transparent text-teal-600" : "text-gray-900"} flex pl-10 items-center w-full py-2 text-sm`}>
                                    <PersonIcon className="mr-3.5 text-gray-500 " />
                                    User Profile
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink to="/order" className={`${active ? "bg-transparent text-teal-600" : "text-gray-900"} flex pl-10 items-center w-full py-2 text-sm`}>
                                    <ReceiptOutlinedIcon className="mr-3.5 text-gray-500" />
                                    Transaction
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button onClick={logoutHandler} className={`${active ? "bg-transparent text-teal-600" : "text-gray-900"} flex pl-10 items-center w-full py-2 text-sm`}>
                                    <LogoutIcon className="mr-3.5 text-gray-500" />
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}

                    {/* Mobile Navigation */}
                    <div className="sm:hidden block ">
                      <Disclosure.Button className="p-2 ">{open ? <ExpandMoreOutlinedIcon fontSize="large" className="border-2 border-gray-300 rounded-full hover:bg-gray-200" /> : <ExpandMoreOutlinedIcon fontSize="large" className="border-2 border-gray-300 rounded-full hover:bg-gray-200" />}</Disclosure.Button>
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
                      <Disclosure.Button key={nav.name} as={NavLink} to={nav.path} className="block px-3 py-2 font-medium text-center hover:bg-teal-600  hover:text-white">
                        {nav.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                ) : (
                  <div className="pb-5 mt-2 px-2 shadow-md divide-y divide-gray-200">
                    <div className="">
                      <Disclosure.Button as={NavLink} to="/">
                        <h1 className="text-3xl text-center py-2 underline">LooFi</h1>
                      </Disclosure.Button>
                    </div>
                    <div className="">
                      <div className="my-5 px-6 flex items-center justify-center">
                        <div className="w-10 h-10 flex items-center">
                          <img className="w-full rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="profile" />
                        </div>
                        <div className="flex flex-col ml-3.5">
                          <p className="font-semibold text-lg">{currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)}</p>
                          <small>{currentUser.email}</small>
                        </div>
                      </div>
                      {navigation2.map((nav) => (
                        <Disclosure.Button key={nav} as={NavLink} to={nav.path} className="block px-3 py-2 font-medium text-center hover:bg-teal-600 hover:text-white">
                          {nav.name}
                        </Disclosure.Button>
                      ))}
                    </div>
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
