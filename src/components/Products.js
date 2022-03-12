import { useEffect, useState } from "react";
import styled from "styled-components";
import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { publicRequest } from "../utilities/requestMethods";

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Products = ({ filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productsSum = filteredProducts.length;

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

  useEffect(() => {
    // prettier-ignore
    setFilteredProducts(
      products.filter((item) => 
        Object.entries(filter).every(([key, value]) => item[key].includes(value))
      )
    );
  }, [products, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div>
      <p className="text-right text-gray-60 px-8">Showing {productsSum} products</p>
      <h1 className="text-center text-4xl">{`All Category`.toUpperCase()}.</h1>
      <div className="p-5 xs:flex hidden flex-wrap justify-between">
        {filteredProducts.map((product) => (
          <div key={product._id} className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative">
            <div className="w-52 h-52 rounded-full bg-white absolute"></div>
            <img src={product.imageUrl} alt={product.title} className="h-3/4 z-[2]" />
            <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100">
              <Icon>
                <ShoppingCartOutlined />
              </Icon>
              <NavLink to={`/product/${product._id}`}>
                <Icon>
                  <Visibility />
                </Icon>
              </NavLink>
              <Icon>
                <FavoriteBorderOutlined />
              </Icon>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
