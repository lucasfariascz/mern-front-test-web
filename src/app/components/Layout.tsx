'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token'); // Obtém o token dos cookies
    setIsLoggedIn(!!token); // Define `true` se o token existir
  }, []);

  const handleLogout = () => {
    deleteCookie('token'); // Remove o token
    setIsLoggedIn(false); // Atualiza o estado
    router.push('/login'); // Redireciona para a página de login
  };
  

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7EBE1" }}>
      {/* Header */}
      <header className="py-4 px-6" style={{ background: "#EDA276" }}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:text-gray-100 transition"
          >
            QuestionApp
          </Link>
          <div className="space-x-6">
            <Link 
              href="/home" 
              className="text-white hover:text-gray-100 font-medium transition"
            >
              Home
            </Link>
            <>
              {isLoggedIn ?
                (
                  <Link 
                    href="/questions" 
                    className="text-white hover:text-gray-100 font-medium transition"
                  >
                    Questões
                  </Link>
                ) : (<a></a>)
              }
            </>
            <>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-100 font-medium transition"
        >
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="text-white hover:text-gray-100 font-medium transition"
        >
          Login
        </Link>
      )}
    </>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="py-6 px-6 text-white mt-auto"
        style={{ background: "#EDA276" }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2024 QuestionApp. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}