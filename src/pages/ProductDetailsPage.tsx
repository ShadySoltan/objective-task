import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <div className="text-center text-2xl">Product not found</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="w-full h-auto object-cover rounded" />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-gray-700 mb-4">${product.price.toFixed(2)}</p>
        <p className="text-sm text-yellow-500 mb-4">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        <p className="text-sm text-gray-400 mb-4">Category: {product.category}</p>
        <button className="bg-yellow-400 text-white p-2 rounded mr-2 hover:bg-yellow-500">Add to Cart</button>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Buy Now</button>
      </div>
    </div>
  );
};

export default ProductDetailsPage;