import axios from 'axios';
import { cookies } from 'next/headers';

interface FormData {
  name: string;
  email: string;
  dateOfBirth: string | null;
}

interface MessageContent {
  formData: FormData;
  interests: string[];
  preferredService: string;
  goals: string;
  experienceLevel: string;
  emotional: number;
  spiritualPreferences: string;
  deliveryMethod: string;
  personalityMatch: string;
  schedulingPreferences: string[];
  additionalDetails: string;
  subscriptionPreference: string;
}

interface Message {
  id: number;
  name: string;
  jsonContent: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: Message[];
}

// Função para buscar mensagens no lado do servidor
async function fetchMessages(token: string): Promise<ApiResponse> {
  try {
    const response = await axios.get('http://104.131.172.164:3000/api/question', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });  
    return response.data;
  } catch (error) {
    throw new Error('Error:' + error);
  }
}

export default async function QuestionsPage() {
  const token = (await cookies()).get('token')?.value ?? '';
  const data = await fetchMessages(token);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Questões Recebidas
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Serviço</th>
                <th className="px-4 py-3 font-medium">Interesses</th>
                <th className="px-4 py-3 font-medium">Objetivos</th>
                <th className="px-4 py-3 font-medium">Nível Emocional</th>
                <th className="px-4 py-3 font-medium">Método de Entrega</th>
                <th className="px-4 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {
                data.message.map((item) => {
                  const content: MessageContent = JSON.parse(item.jsonContent);
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">{content.formData.name}</td>
                      <td className="px-4 py-3">{content.formData.email}</td>
                      <td className="px-4 py-3">{content.preferredService}</td>
                      <td className="px-4 py-3">{content.interests.join(', ')}</td>
                      <td className="px-4 py-3">{content.goals}</td>
                      <td className="px-4 py-3">{content.emotional}</td>
                      <td className="px-4 py-3">{content.deliveryMethod}</td>
                      <td className="px-4 py-3">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
