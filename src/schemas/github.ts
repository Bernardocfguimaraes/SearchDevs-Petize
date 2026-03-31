import { z } from 'zod';

export const userSchema = z.object({
  avatar_url: z.string().url(),
  name: z.string().nullable(),
  login: z.string(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
});


export type GithubUser = z.infer<typeof userSchema>;

export const repoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  updated_at: z.string(),
});

export type GithubRepo = z.infer<typeof repoSchema>;