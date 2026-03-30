'use client';

import { use, useEffect, useState } from 'react';
import { Flex, Text, Spinner, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/services/github';
import { GithubUser } from '@/schemas/github';
import { ProfileSidebar } from '@/components/ProfileSidebar';

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError(false);
        const userData = await getUserProfile(resolvedParams.username);
        
        if (!userData) {
          setError(true); 
        } else {
          setUser(userData);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [resolvedParams.username]);


  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#FAFAFA">
        <Spinner size="xl" color="#8C14FC" />
      </Flex>
    );
  }

  if (error || !user) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="#FAFAFA" direction="column" gap={4}>
        <Text fontSize="2xl" color="gray.700" fontWeight="medium">
          Não há usuários com esse nome
        </Text>
        <Button onClick={() => router.push('/')} colorScheme="gray">
          Voltar para a busca
        </Button>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" bg="#FAFAFA" direction="column">
      <Flex w="100%" p={4} bg="white" boxShadow="sm" mb={8} justify="center">
        <Text fontWeight="bold" color="#0056D2" fontSize="xl" cursor="pointer" onClick={() => router.push('/')}>
          Search <Text as="span" color="#8C14FC">d_evs</Text>
        </Text>
      </Flex>

      <Flex w="100%" maxW="1200px" mx="auto" px={4} gap={8} direction={{ base: 'column', md: 'row' }} align="flex-start">
        
        <ProfileSidebar user={user} />
        
        <VStack flex={1} w="100%" bg="white" p={6} borderRadius="md" boxShadow="sm" align="stretch">
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            Repositórios
          </Text>
          <Text color="gray.500">
            Aqui vai entrar a lista com scroll infinito em breve!
          </Text>
        </VStack>

      </Flex>
    </Flex>
  );
}