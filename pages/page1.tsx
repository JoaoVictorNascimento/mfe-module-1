import React from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

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

interface Page1Props {
  products: Product[];
  error?: string;
}

export default function Page1({ products, error }: Page1Props) {
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Módulo 1 - Sistema de Produtos</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link 
              href="/page1" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
            >
              Página 1
            </Link>
            <Link 
              href="/page2" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Página 2
            </Link>
          </div>

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>❌ Erro:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Módulo 1 - Sistema de Produtos</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link 
            href="/page1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
          >
            Página 1
          </Link>
          <Link 
            href="/page2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 2
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">🛍️ Lista de Produtos</h1>
          <p className="text-blue-100">Aqui estão os produtos disponíveis:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    console.log('🔄 [SSR] Executando getServerSideProps para Page1 no servidor');
    const response = await fetch('https://fakestoreapi.com/products?limit=6');
    
    if (!response.ok) {
      throw new Error('Falha ao carregar produtos');
    }
    
    const products = await response.json();
    console.log(`✅ [SSR] Produtos carregados com sucesso: ${products.length} itens`);
    
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error('❌ [SSR] Erro ao carregar produtos:', error);
    return {
      props: {
        products: [],
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
    };
  }
};
