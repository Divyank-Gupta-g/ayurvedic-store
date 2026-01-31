import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/product/ProductCard';

const ProductCategories = () => {
    const { products } = useAppContext();
    const { category } = useParams();
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category.toLowerCase());
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category.toLowerCase());

  return (
    <div className='mt-16'>
        {searchCategory && (
            <div className="flex flex-col items-end w-max mb-8">
                <h2 className="text-4xl font-bold text-green-800 mb-2">{searchCategory.text.toUpperCase()}</h2>
                <div className="w-16 h-0.5 bg-primary rounded-full"></div>
                <p className="text-gray-600">{searchCategory.description}</p>
            </div>
        )}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        ) : (
            <p className="text-gray-600">No products found in this category.</p>
        )}
    </div>
  )
}

export default ProductCategories;