import { Flex, Box, Image, Text, Button, VStack, HStack, Icon } from '@chakra-ui/react';
import { Users, Building2, MapPin, Mail, Link as LinkIcon } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa'; 
import { GithubUser } from '../schemas/github';
import { useTranslation } from 'react-i18next';

interface ProfileSidebarProps {
  user: GithubUser;
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const { t } = useTranslation();

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
          <Icon as={Users} size={16} />
          <Text><b>{user.followers}</b> {t('profile.followers')}</Text>
        </Flex>
        <Text><b>{user.following}</b> {t('profile.following')}</Text>
      </HStack>

      <VStack align="start" spacing={3} mb={6} w="100%">
        {user.company && (
          <Flex align="center" gap={2} fontSize="sm" color="gray.600">
            <Icon as={Building2} size={16} />
            <Text>{user.company}</Text>
          </Flex>
        )}
        {user.location && (
          <Flex align="center" gap={2} fontSize="sm" color="gray.600">
            <Icon as={MapPin} size={16} />
            <Text>{user.location}</Text>
          </Flex>
        )}
        {user.email && (
          <Flex align="center" gap={2} fontSize="sm" color="gray.600">
            <Icon as={Mail} size={16} />
            <Text>{user.email}</Text>
          </Flex>
        )}
        
        {user.blog && (
          <Button 
            as="a" 
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outline" 
            leftIcon={<LinkIcon size={16} />}
            w="100%"
            size="sm"
            colorScheme="messenger"
            justifyContent="flex-start"
          >
            {user.blog.replace(/^https?:\/\//, '')}
          </Button>
        )}

        {user.twitter_username && (
          <Button 
            as="a" 
            href={`https://twitter.com/${user.twitter_username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            variant="outline" 
            leftIcon={<Icon as={FaTwitter} />}
            w="100%"
            size="sm"
            colorScheme="messenger"
            justifyContent="flex-start"
          >
            @{user.twitter_username}
          </Button>
        )}
      </VStack>

      <Button 
        as="a"
        href={user.email ? `mailto:${user.email}` : `https://github.com/${user.login}`}
        target="_blank"
        rel="noopener noreferrer"
        w="100%" 
        bg="#8C14FC" 
        color="white" 
        _hover={{ bg: '#720bd1' }}
      >
        {t('profile.contact')}
      </Button>
    </Box>
  );
}