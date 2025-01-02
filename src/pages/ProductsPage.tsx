import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

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
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded shadow-lg p-4 hover:shadow-xl">
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-2" />
            <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-1">${product.price.toFixed(2)}</p>
            <p className="text-sm text-yellow-500 mb-2">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;