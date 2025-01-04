/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
   
  const [email, setEmail] = useState('');
   
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')
    const password = formData.get('password')
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      console.log('r: ', response)
      Cookies.set('token', response.data.message.token); // Armazena o token em cookies
      router.push('/home'); // Redireciona após login
    } catch (err) {
      setIsLoading(false);
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Acesse sua Conta
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Entre para acessar todas as funcionalidades do sistema.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Login
          </h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition"
                placeholder="Sua senha"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-orange-500" />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-800">
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{ background: "#EDA276" }}
              className="w-full py-2 px-4 text-white rounded-md hover:opacity-90 transition disabled:opacity-70"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Benefícios do Acesso
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Acesso completo às análises detalhadas
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Visualização de todas as respostas dos usuários
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Exportação de dados e relatórios
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Dashboard personalizado
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Ainda não tem uma conta?</p>
            <Link
              href="/register"
              className="block text-center py-2 px-4 border-2 border-orange-400 text-orange-600 rounded-md hover:bg-orange-50 transition"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}