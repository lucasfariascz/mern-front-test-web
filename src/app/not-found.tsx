import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
      <Link 
        href="/" 
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Voltar para Home
      </Link>
    </div>
  )
}