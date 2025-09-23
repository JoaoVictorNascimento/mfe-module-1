import { Module1Home } from '../components';

export default function Module1HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          🧪 Teste Local - Módulo 1 (SSR)
        </h1>
        <Module1Home />
      </div>
    </div>
  );
}
