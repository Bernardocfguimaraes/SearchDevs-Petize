import { Flex, Box, Image, Text, Button, Link as ChakraLink, VStack, HStack } from '@chakra-ui/react';
import { Users, Building2, MapPin, Mail, Link as LinkIcon, AtSign} from 'lucide-react';
import { GithubUser } from '../schemas/github';

interface ProfileSidebarProps {
  user: GithubUser;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  return (
    <Box 
      w={{ base: '100%', md: '300px' }} 
      bg="white" 
      p={6} 
      borderRadius="md" 
      boxShadow="sm"
    >
      <Flex direction="row" align="center" gap={4} mb={4}>
        <Image 
          src={user.avatar_url} 
          alt={user.name || user.login} 
          boxSize="64px" 
          borderRadius="full" 
        />
        <Box>
          <Text fontWeight="bold" fontSize="lg" color="gray.800">
            {user.name || user.login}
          </Text>
          <Text fontSize="sm" color="gray.500">
            @{user.login}
          </Text>
        </Box>
      </Flex>

      {user.bio && (
        <Text fontSize="sm" color="gray.600" mb={4}>
          {user.bio}
        </Text>
      )}

      <HStack fontSize="sm" color="gray.600" mb={4} spacing={4}>
        <Flex align="center" gap={1}>
          <Users size={16} />
          <Text><b>{user.followers}</b> seguidores</Text>
        </Flex>
        <Text><b>{user.following}</b> seguindo</Text>
      </HStack>

      <VStack align="start" spacing={2} fontSize="sm" color="gray.600" mb={6}>
        {user.company && (
          <Flex align="center" gap={2}><Building2 size={16} /><Text>{user.company}</Text></Flex>
        )}
        {user.location && (
          <Flex align="center" gap={2}><MapPin size={16} /><Text>{user.location}</Text></Flex>
        )}
        {user.email && (
          <Flex align="center" gap={2}><Mail size={16} /><Text>{user.email}</Text></Flex>
        )}
        
        {user.blog && (
          <Flex align="center" gap={2}>
            <LinkIcon size={16} />
            <ChakraLink href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} isExternal color="#0056D2">
              {user.blog}
            </ChakraLink>
          </Flex>
        )}

        {user.twitter_username && (
          <Flex align="center" gap={2}>
            <AtSign size={16} />
            <ChakraLink href={`https://twitter.com/${user.twitter_username}`} isExternal color="#0056D2">
              @{user.twitter_username}
            </ChakraLink>
          </Flex>
        )}
      </VStack>

      <Button 
        w="100%" 
        bg="#8C14FC" 
        color="white" 
        _hover={{ bg: '#720bd1' }}
      >
        Contato
      </Button>
    </Box>
  );
}