import React from 'react';
import { useLoader } from '@modern-js/runtime';
import { loader } from './page2.data';
import '../styles.css';

interface LoaderData {
  categories: string[];
  error?: string;
}

const Page2: React.FC = () => {
  const { data, error } = useLoader<LoaderData>(loader);
  const categories = data?.categories || [];
  const loading = !categories.length && !error;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "men's clothing":
        return '👔';
      case "women's clothing":
        return '👗';
      case 'jewelery':
        return '💍';
      case 'electronics':
        return '📱';
      default:
        return '📦';
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-red-500 to-red-600',
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
        <h1 className="text-2xl font-bold">Módulo 1 - Categorias</h1>
        <p className="mt-4">Carregando categorias...</p>
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
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Módulo 1 - Categorias de Produtos</h1>
        <p className="mt-2">Categorias carregadas via FakeStore API com SSR</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category: string, index: number) => (
          <div
            key={category}
            className={`bg-gradient-to-r ${getCategoryColor(index)} text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-xl font-bold capitalize mb-2">
                {category}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Técnicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Total de Categorias:</strong> {categories.length}
          </div>
          <div>
            <strong>API:</strong> FakeStore API
          </div>
          <div>
            <strong>Renderização:</strong> Server-Side (SSR)
          </div>
          <div>
            <strong>Módulo:</strong> mfe-module-1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
