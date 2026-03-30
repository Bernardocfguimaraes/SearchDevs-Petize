import { Box, Text, Link as ChakraLink, Flex, Icon } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { GithubRepo } from '../schemas/github';

interface RepoCardProps {
  repo: GithubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(repo.updated_at));

  return (
    <Box 
      borderBottom="1px solid" 
      borderColor="gray.200" 
      py={4}
      _last={{ borderBottom: 'none' }}
      w="100%" 
    >
      <ChakraLink 
        href={repo.html_url} 
        isExternal 
        fontWeight="bold" 
        fontSize="xl" 
        color="#24292f"
        _hover={{ color: '#0056D2', textDecoration: 'underline' }}
      >
        {repo.name}
      </ChakraLink>
      
      {repo.description && (
        <Text color="gray.600" mt={2} fontSize="sm" w="100%" lineHeight="tall" wordBreak="break-word">
          {repo.description}
        </Text>
      )}

      <Flex align="center" mt={4} gap={4} fontSize="sm" color="gray.500">
        <Flex align="center" gap={1}>
          <Icon as={Star} boxSize={4} />
          <Text>{repo.stargazers_count}</Text>
        </Flex>
        <Text>•</Text>
        <Text>Atualizado em {formattedDate}</Text>
      </Flex>
    </Box>
  );
}