import { Flex, Box, Text, Button, VStack, HStack, Icon, Divider, Avatar } from '@chakra-ui/react';
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
      borderRadius="xl" 
      border="1px solid" 
      borderColor="purple.100" 
      boxShadow="0 4px 20px rgba(140, 20, 252, 0.05)" 
      h="fit-content" 
    >

      <Flex direction="row" align="center" gap={4} mb={5}>
        <Avatar 
          src={user.avatar_url} 
          name={user.name || user.login} 
          size="xl" 
          showBorder={true}
          borderColor="purple.50" 
        />
        <Box flex="1">
          <Text fontWeight="semibold" fontSize="xl" color="gray.800" lineHeight="1.2" mb={1}>
            {user.name || user.login}
          </Text>
          <Text fontSize="sm" color="gray.500">
            @{user.login}
          </Text>
        </Box>
      </Flex>

      {user.bio && (
        <Text fontSize="sm" color="gray.600" mb={5} lineHeight="tall">
          {user.bio}
        </Text>
      )}

      <HStack fontSize="sm" color="gray.600" mb={5} spacing={4}>
        <Flex align="center" gap={1.5}>
          <Icon as={Users} size={16} color="gray.400" />
          <Text>
            <Text as="span" fontWeight="semibold" color="gray.900">{user.followers}</Text> {t('profile.followers')}
          </Text>
        </Flex>
        <Text>
          <Text as="span" fontWeight="semibold" color="gray.900">{user.following}</Text> {t('profile.following')}
        </Text>
      </HStack>

      <Divider mb={5} borderColor="purple.100" />

      <VStack align="start" spacing={3.5} mb={6} w="100%">
        {user.company && (
          <Flex align="center" gap={2.5} fontSize="sm" color="gray.600">
            <Icon as={Building2} size={16} color="gray.400" />
            <Text>{user.company}</Text>
          </Flex>
        )}
        {user.location && (
          <Flex align="center" gap={2.5} fontSize="sm" color="gray.600">
            <Icon as={MapPin} size={16} color="gray.400" />
            <Text>{user.location}</Text>
          </Flex>
        )}
        {user.email && (
          <Flex align="center" gap={2.5} fontSize="sm" color="gray.600">
            <Icon as={Mail} size={16} color="gray.400" />
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
            color="gray.600"
            borderColor="purple.50" 
            bg="gray.50"
            justifyContent="flex-start"
            fontWeight="normal"
            _hover={{ borderColor: '#8C14FC', color: '#8C14FC', bg: 'purple.50' }} 
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
            color="gray.600"
            borderColor="purple.50"
            bg="gray.50"
            justifyContent="flex-start"
            fontWeight="normal"
            _hover={{ borderColor: '#00ACEE', color: '#00ACEE', bg: 'blue.50' }} 
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
        fontWeight="medium"
        _hover={{ 
          bg: '#720bd1', 
          transform: 'translateY(-2px)', 
          boxShadow: '0 4px 12px rgba(140, 20, 252, 0.2)' 
        }}
        _active={{ 
          transform: 'translateY(0)', 
          boxShadow: 'none' 
        }}
        transition="all 0.2s"
      >
        {t('profile.contact')}
      </Button>
    </Box>
  );
}