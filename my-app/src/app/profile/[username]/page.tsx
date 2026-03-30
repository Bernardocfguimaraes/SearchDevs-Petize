'use client';

import { use } from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="#FAFAFA" p={8}>
      <Heading color="#0056D2" mb={4}>
        Perfil de: <Text as="span" color="#8C14FC">{resolvedParams.username}</Text>
      </Heading>
      
      <Text mb={8}>Aqui vamos carregar os dados da API do GitHub em breve!</Text>
      
      <Button onClick={() => router.push('/')} colorScheme="gray">
        Voltar para a Home
      </Button>
    </Flex>
  );
}