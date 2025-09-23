import React from 'react'
import Link from 'next/link'

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

// Server Component que faz SSR internamente
async function getUsers(): Promise<User[]> {
  try {
    console.log('🔄 [SSR] Executando getUsers no servidor');
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'no-store' // Sempre buscar dados frescos
    });
    
    if (!response.ok) {
      throw new Error('Falha ao carregar usuários');
    }
    
    const users = await response.json();
    console.log(`✅ [SSR] Usuários carregados com sucesso: ${users.length} itens`);
    return users;
  } catch (error) {
    console.error('❌ [SSR] Erro ao carregar usuários:', error);
    return [];
  }
}

export default async function Module1Page2() {
  const users = await getUsers();
  
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Módulo 1 - Sistema de Produtos</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 justify-center items-center">
            <Link 
              href="/module1" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
            >
              Home
            </Link>
            <Link 
              href="/module1/page1" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Página 1
            </Link>
            <Link 
              href="/module1/page2" 
              className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
            >
              Página 2
            </Link>
          </div>

          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>❌ Erro:</strong> Falha ao carregar usuários
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
            href="/module1/page1" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 1
          </Link>
          <Link 
            href="/module1/page2" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
          >
            Página 2
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
              <p className="text-gray-600 text-sm flex-grow mb-1">@{user.username}</p>
              <p className="text-gray-600 text-sm flex-grow mb-3">{user.email}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-blue-700 text-sm">{user.phone}</span>
                <Link href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                  {user.website}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
