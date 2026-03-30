import { userSchema, GithubUser } from '../schemas/github';

const BASE_URL = 'https://api.github.com';

export async function getUserProfile(username: string): Promise<GithubUser | null> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      cache: 'no-store', 
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Falha ao buscar os dados do usuário');
    }

    const data = await response.json();
    
    return userSchema.parse(data);
    
  } catch (error) {
    console.error("Erro na requisição do GitHub:", error);
    throw error;
  }
}