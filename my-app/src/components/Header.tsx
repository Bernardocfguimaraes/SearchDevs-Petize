'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Input, Button, Box, VStack, Icon, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Clock, Search } from 'lucide-react';

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
    <Flex 
      w="100%" 
      p={4} 
      px={{ base: 4, md: 8 }} 
      bg="white" 
      boxShadow="sm" 
      mb={8} 
      justify="space-between" 
      align="center" 
      gap={4} 
      direction={{ base: 'column', md: 'row' }}
    >

      <Flex flex="1" justify={{ base: 'center', md: 'flex-start' }} align="center">

        <Box 
          cursor="pointer" 
          onClick={() => router.push('/')}
          display="inline-block"
        >
          <Text 
            fontWeight="semibold" 
            fontSize="2xl" 
            letterSpacing="2px"
            lineHeight="1" 
            m={0}
          >
            <Text as="span" color="#0056D2">Search </Text>
            <Text 
              as="span" 
              bgGradient="linear(to-r, #0056D2 -10%, #8C14FC 40%)" 
              bgClip="text"
            >
              d_evs
            </Text>
          </Text>
        </Box>
      </Flex>

      <Box position="relative" w="100%" maxW="400px" ref={wrapperRef} flex="2">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Search} color="gray.400" size={18} />
          </InputLeftElement>
          
          <Input
            placeholder={t('header.searchPlaceholder')}
            bg="#FAFAFA"
            size="md"
            borderRadius="full" 
            border="1px solid"
            borderColor="gray.200"
            _hover={{ borderColor: 'gray.300' }}
            focusBorderColor="#8C14FC"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => setShowHistory(true)}
            pl={10}
          />
        </InputGroup>

        {showHistory && recentSearches.length > 0 && (
          <Box
            position="absolute"
            top="calc(100% + 8px)"
            left={0}
            w="100%"
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

      <Flex flex="1" justify={{ base: 'center', md: 'flex-end' }} align="center" gap={2}>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {i18n.language === 'pt' ? 'Idioma:' : 'Language:'}
        </Text>
        <Button 
          onClick={toggleLanguage} 
          size="sm" 
          variant="ghost" 
          colorScheme="purple"
          borderRadius="full"
        >
          {i18n.language === 'pt' ? 'English' : 'Português'}
        </Button>
      </Flex>
    </Flex>
  );
}