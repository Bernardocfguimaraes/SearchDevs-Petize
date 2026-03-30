'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (username.trim() === '') return; 
    
    router.push(`/profile/${username}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="#FAFAFA"
      px={4}
    >
      <Heading as="h1" fontSize="5xl" mb={10} color="#0056D2" fontWeight="medium">
        Search <Text as="span" color="#8C14FC">d_evs</Text>
      </Heading>

      <Flex w="100%" maxW="600px" gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Input
          placeholder="Search"
          bg="white"
          size="lg"
          borderRadius="md"
          focusBorderColor="#8C14FC"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          bg="#8C14FC"
          color="white"
          size="lg"
          px={10}
          _hover={{ bg: '#720bd1' }}
          _active={{ bg: '#5a08a8' }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Flex>
    </Flex>
  );
}