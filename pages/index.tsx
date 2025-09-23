import Link from 'next/link'

export default function Module1Home() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📦 Módulo 1 - Sistema de Produtos</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white"
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
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Página 2
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg text-center w-full">
          <h1 className="text-2xl font-bold">Módulo 1 - Home</h1>
          <p className="mt-2">Selecione uma página acima para navegar</p>
        </div>
      </div>
    </div>
  )
}
