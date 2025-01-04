export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Bem-vindo ao Sistema de Questões
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Uma plataforma intuitiva para gerenciar e analisar respostas de usuários.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Recursos Principais
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Visualização detalhada de respostas</li>
            <li>• Análise de preferências dos usuários</li>
            <li>• Interface intuitiva e responsiva</li>
            <li>• Dados em tempo real</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Estatísticas
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Total de respostas: 1,234</li>
            <li>• Usuários ativos: 567</li>
            <li>• Média de satisfação: 4.5/5</li>
            <li>• Tempo médio de resposta: 5min</li>
          </ul>
        </div>
      </div>
    </div>
  )
}