import { userSchema, GithubUser } from '../schemas/github';
import { repoSchema, GithubRepo } from '../schemas/github';
import { z } from 'zod';

const BASE_URL = 'https://api.github.com';

const getHeaders = (): HeadersInit => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export async function getUserProfile(username: string): Promise<GithubUser | null> {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      cache: 'no-store',
      headers: getHeaders(), 
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      if (response.status === 403) throw new Error('Limite de requisições da API excedido.');
      throw new Error('Falha ao buscar os dados do usuário');
    }

    const data = await response.json();
    
    return userSchema.parse(data);
    
  } catch (error) {
    console.error("Erro na requisição do GitHub:", error);
    throw error;
  }
}

export async function getUserRepos(
  username: string, 
  page: number = 1, 
  sort: string = 'updated'
): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${username}/repos?per_page=10&page=${page}&sort=${sort}`,
      { 
        cache: 'no-store',
        headers: getHeaders(), 
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar os repositórios');
    }

    const data = await response.json();
    
    return z.array(repoSchema).parse(data);
  } catch (error) {
    console.error("Erro na requisição de repositórios:", error);
    return [];
  }
}