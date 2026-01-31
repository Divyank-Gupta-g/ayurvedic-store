import ProductCard from "../components/product/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const Products = () => {
  const {products, searchQuery} = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     setFilteredProducts(products);
  //   } else {
  //     const filtered = products.filter((product) =>
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }, [searchQuery, products]);

  useEffect(() => {
    if (searchQuery.length > 0){
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-10 bg-gray-50 min-h-screen p-6 rounded-xl">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        Our Ayurvedic Medicines
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.filter((product) => product.inStock).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </div>
  );
};

export default Products;
