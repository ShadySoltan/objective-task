// ProductsPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { 
  constants
} from '../common/constants';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    axios.get(constants.API_URL)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(constants.ERROR_FETCHING_PRODUCTS, error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder={constants.SEARCH_PLACEHOLDER}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="border rounded shadow-lg p-4 hover:shadow-xl hover:shadow-2xl hover:scale-105 transition-transform"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="h-48 w-full object-cover mb-2" 
            />
            <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-1">${product.price.toFixed(2)}</p>
            <p className="text-sm text-yellow-500 mb-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
              {constants.VIEW_PRODUCT_TEXT}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
