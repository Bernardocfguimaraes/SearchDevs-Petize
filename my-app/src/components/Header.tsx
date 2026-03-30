// src/components/Header.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Input, Button, Box, VStack, Icon } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';

export function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();
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

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      saveSearchToHistory(searchValue.trim());
      router.push(`/profile/${searchValue.trim()}`);
      setSearchValue('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (username: string) => {
    saveSearchToHistory(username);
    router.push(`/profile/${username}`);
    setSearchValue('');
    setShowHistory(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <Flex w="100%" p={4} bg="white" boxShadow="sm" mb={8} justify="center" align="center" gap={8} direction={{ base: 'column', sm: 'row' }}>
      <Text fontWeight="bold" color="#0056D2" fontSize="2xl" cursor="pointer" onClick={() => router.push('/')}>
        Search <Text as="span" color="#8C14FC">d_evs</Text>
      </Text>

      <Box position="relative" w="100%" maxW="400px" ref={wrapperRef}>
        <Input
          placeholder={t('header.searchPlaceholder')}
          bg="#FAFAFA"
          size="md"
          borderRadius="md"
          focusBorderColor="#8C14FC"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
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

      <Button onClick={toggleLanguage} size="sm" variant="outline" colorScheme="purple">
        {i18n.language === 'pt' ? 'EN' : 'PT'}
      </Button>
    </Flex>
  );
}