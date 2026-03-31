'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, VStack, Spinner, Text, Flex, Heading, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next'; 
import { BookMarked } from 'lucide-react'; 
import { GithubRepo } from '../schemas/github';
import { getUserRepos } from '../services/github';
import { RepoCard } from './RepoCard';
import { SortSelect } from './SortSelect';

interface RepoListProps {
  username: string;
}

export function RepoList({ username }: RepoListProps) {
  const { t } = useTranslation(); 
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('updated');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true; 

    async function fetchRepos() {
      setLoading(true);
      try {
        const data = await getUserRepos(username, page, sort);

        if (isMounted) {
          setRepos((prev) => {
            if (page === 1) return data;
            
            const newRepos = data.filter(
              (newRepo) => !prev.some((prevRepo) => prevRepo.id === newRepo.id)
            );
            return [...prev, ...newRepos];
          });
          
          setHasMore(data.length === 10);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username, page, sort]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
    setRepos([]); 
  };

  return (
    <Box 
      w="100%" 
      bg="white" 
      p={{ base: 4, md: 6 }} 
      borderRadius="xl" 
      border="1px solid" 
      borderColor="purple.100" 
      boxShadow="0 4px 20px rgba(140, 20, 252, 0.05)" 
      minW={0}
    >

      <Flex 
        justify="space-between" 
        align="center" 
        mb={6} 
        wrap="wrap" 
        gap={4}
      >
        <Flex align="center" gap={2.5}>
          <Flex 
            p={1.5} 
            bg="purple.50" 
            borderRadius="md" 
            color="#8C14FC"
          >
            <Icon as={BookMarked} boxSize={5} />
          </Flex>
          <Heading 
            as="h2" 
            fontSize="lg" 
            fontWeight="semibold" 
            color="gray.800"
            letterSpacing="-0.5px"
          >

            {t('repos.title', 'Repositórios')} 
          </Heading>
        </Flex>

        <SortSelect value={sort} onChange={handleSortChange} />
      </Flex>
      
      <VStack align="stretch" spacing={4} w="100%">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </VStack>

      <Box ref={observerTarget} w="100%" h="20px" mt={4} />

      {loading && (
        <Flex justify="center" py={6}>
          <Spinner color="#8C14FC" size="lg" thickness="3px" />
        </Flex>
      )}

      {!loading && repos.length === 0 && (
        <Text textAlign="center" color="gray.500" py={10} fontSize="lg">
          {t('repos.empty', 'Nenhum repositório encontrado.')}
        </Text>
      )}
    </Box>
  );
}