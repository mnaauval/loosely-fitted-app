import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery, useGetProductsCategoryQuery } from "../../redux/features/productsAPI";
import { productsFetch } from "../../redux/features/productsSlice";

const ApiTest = ({ cat, filter, sort }) => {
  // const { data, isLoading, error } = useGetProductsCategoryQuery(cat);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  // console.log(filteredProducts, cat);

  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(filteredProducts, `----`, items);

  const productsSum = items.length;

  useEffect(() => {
    dispatch(productsFetch(cat));
    setFilteredProducts(items);
  }, [dispatch, cat]);

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
      <h1 className="text-center text-4xl">{`Test`.toUpperCase()}</h1>

      <div className="p-5 xs:flex hidden flex-wrap justify-between">
        {items.map((item) => (
          <div key={item._id}>
            {/* {filteredProducts.map((product) => (
                  <div key={product._id} className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative">
                    <div className="w-52 h-52 rounded-full bg-white absolute"></div>
                    <img src={product.imageUrl} alt={product.title} className="h-3/4 z-[2]" />
                    <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100"></div>
                  </div>
                ))} */}

            <div key={item._id} className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative">
              <div className="w-52 h-52 rounded-full bg-white absolute"></div>
              <img src={item.imageUrl} alt={item.title} className="h-3/4 z-[2]" />
              <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;
