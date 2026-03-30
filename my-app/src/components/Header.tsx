'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Input } from '@chakra-ui/react';

export function Header() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      router.push(`/profile/${searchValue}`);
      setSearchValue(''); 
    }
  };

  return (
    <Flex 
      w="100%" 
      p={4} 
      bg="white" 
      boxShadow="sm" 
      mb={8} 
      justify="center" 
      align="center" 
      gap={8}
      direction={{ base: 'column', sm: 'row' }} 
    >
      <Text 
        fontWeight="bold" 
        color="#0056D2" 
        fontSize="2xl" 
        cursor="pointer" 
        onClick={() => router.push('/')}
      >
        Search <Text as="span" color="#8C14FC">d_evs</Text>
      </Text>

      <Input
        placeholder="Search"
        w="100%"
        maxW="400px"
        bg="#FAFAFA"
        size="md"
        borderRadius="md"
        focusBorderColor="#8C14FC"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </Flex>
  );
}