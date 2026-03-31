import { Metadata } from 'next';

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  return {
    title: `${username} | Search d_evs`,
    description: `Confira o perfil, repositórios e estatísticas de ${username} no GitHub.`,
    openGraph: {
      title: `${username} | Search d_evs`,
      description: `Confira o perfil e repositórios de ${username} no GitHub.`,
    },
  };
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}