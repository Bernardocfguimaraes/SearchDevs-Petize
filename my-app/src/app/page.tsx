'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading, Input, Button, Text, Box, VStack, Icon } from '@chakra-ui/react';
import { Clock } from 'lucide-react';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('@searchdevs:history');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveSearchToHistory = (username: string) => {
    const updatedHistory = [
      username,
      ...recentSearches.filter((item) => item !== username)
    ].slice(0, 5);
    
    setRecentSearches(updatedHistory);
    localStorage.setItem('@searchdevs:history', JSON.stringify(updatedHistory));
  };

  const handleSearch = () => {
    if (searchValue.trim() === '') return;
    saveSearchToHistory(searchValue.trim());
    router.push(`/profile/${searchValue.trim()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (username: string) => {
    saveSearchToHistory(username);
    router.push(`/profile/${username}`);
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="#FAFAFA" px={4}>
      <Heading as="h1" fontSize="5xl" mb={10} color="#0056D2" fontWeight="medium">
        Search <Text as="span" color="#8C14FC">d_evs</Text>
      </Heading>

      <Flex w="100%" maxW="600px" gap={4} direction={{ base: 'column', sm: 'row' }}>
        
        <Box position="relative" w="100%" ref={wrapperRef}>
          <Input
            placeholder="Search"
            bg="white"
            size="lg"
            borderRadius="md"
            focusBorderColor="#8C14FC"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowHistory(true)}
          />

          {showHistory && recentSearches.length > 0 && (
            <Box
              position="absolute"
              top="100%"
              left={0}
              w="100%"
              mt={1}
              bg="white"
              boxShadow="md"
              borderRadius="md"
              zIndex={10}
              overflow="hidden"
              border="1px solid"
              borderColor="gray.100"
            >
              <VStack align="stretch" spacing={0}>
                {recentSearches.map((username) => (
                  <Flex
                    key={username}
                    p={3}
                    align="center"
                    gap={3}
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => handleHistoryClick(username)}
                  >
                    <Icon as={Clock} size={16} color="gray.400" />
                    <Text fontSize="sm" color="gray.700" fontWeight="medium">
                      {username}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          )}
        </Box>

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