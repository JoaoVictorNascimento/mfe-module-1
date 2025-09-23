import React from 'react'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Page2Props {
  users: User[];
  error?: string;
}

export default function Page2({ users, error }: Page2Props) {
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
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Página 1
            </Link>
            <Link 
              href="/page2" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
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
            href="/module1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Home
          </Link>
          <Link 
            href="/page1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 1
          </Link>
          <Link 
            href="/page2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
          >
            Página 2
          </Link>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">👥 Lista de Usuários</h1>
          <p className="text-purple-100">Aqui estão os usuários do sistema:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-16">Email:</span>
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-16">Phone:</span>
                  <span className="text-gray-900">{user.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-16">Website:</span>
                  <span className="text-blue-600 hover:underline">{user.website}</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-gray-500 w-16">Address:</span>
                  <span className="text-gray-900">
                    {user.address.street}, {user.address.suite}<br/>
                    {user.address.city}, {user.address.zipcode}
                  </span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-gray-500 w-16">Company:</span>
                  <span className="text-gray-900">
                    {user.company.name}<br/>
                    <span className="text-gray-600 italic">"{user.company.catchPhrase}"</span>
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
    console.log('🔄 [SSR] Executando getServerSideProps para Page2 no servidor');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error('Falha ao carregar usuários');
    }
    
    const users = await response.json();
    console.log(`✅ [SSR] Usuários carregados com sucesso: ${users.length} itens`);
    
    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('❌ [SSR] Erro ao carregar usuários:', error);
    return {
      props: {
        users: [],
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
    };
  }
};
