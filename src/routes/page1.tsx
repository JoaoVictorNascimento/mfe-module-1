import React from 'react';
import { useLoader } from '@modern-js/runtime';
import { loader } from './page1.data';
import '../styles.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface LoaderData {
  products: Product[];
  error?: string;
}

const Page1: React.FC = () => {
  const { data, error } = useLoader<LoaderData>(loader);
  const products = data?.products || [];
  const loading = !products.length && !error;

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Módulo 1 - Produtos</h1>
        <p className="mt-4">Carregando produtos...</p>
        <div className="mt-4 animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Erro</h1>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Módulo 1 - Catálogo de Produtos</h1>
        <p className="mt-2">Produtos carregados via FakeStore API com SSR</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="aspect-square p-4 bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 capitalize">
                {product.category}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page1;
