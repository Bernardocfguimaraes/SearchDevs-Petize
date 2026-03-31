import { Box, Text, Link as ChakraLink, Flex, Icon } from '@chakra-ui/react';
import { Star, Clock } from 'lucide-react'; 
import { GithubRepo } from '../schemas/github';
import { useTranslation } from 'react-i18next';

interface RepoCardProps {
  repo: GithubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const { t, i18n } = useTranslation();
  
  const formattedDate = new Intl.DateTimeFormat(i18n.language === 'en' ? 'en-US' : 'pt-BR', {
    day: 'numeric', month: 'short', year: 'numeric'
  }).format(new Date(repo.updated_at));

  return (
    <Box 
      w="100%" 
      p={5}
      bg="white"
      border="1px solid" 
      borderColor="gray.200"
      borderRadius="lg" 
      transition="all 0.2s ease-in-out"
      _hover={{ 
        borderColor: 'purple.200', 
        boxShadow: '0 4px 12px rgba(140, 20, 252, 0.08)', 
        transform: 'translateY(-2px)' 
      }}
    >
      <ChakraLink 
        href={repo.html_url} 
        isExternal 
        fontWeight="bold" 
        fontSize="lg" 
        color="black" 
        _hover={{ color: 'purple.700', textDecoration: 'none' }} 
        display="inline-block"
        mb={2}
      >
        {repo.name}
      </ChakraLink>
      
      {repo.description && (
        <Text color="gray.600" fontSize="sm" w="100%" lineHeight="tall" noOfLines={3}>
          {repo.description}
        </Text>
      )}

      <Flex align="center" mt={4} gap={5} fontSize="xs" color="gray.500" fontWeight="medium">
        <Flex align="center" gap={1.5} _hover={{ color: 'yellow.500' }} transition="color 0.2s">
          <Icon as={Star} boxSize={4} />
          <Text>{repo.stargazers_count}</Text>
        </Flex>
        
        <Flex align="center" gap={1.5}>
          <Icon as={Clock} boxSize={3.5} />
          <Text>{t('repos.updatedAt')} {formattedDate}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}