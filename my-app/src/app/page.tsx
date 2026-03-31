'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Heading, Input, Button, Text, Box, VStack, Icon, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Clock, Search } from 'lucide-react'; 
import { useTranslation } from 'react-i18next'; 

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation(); 

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

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="#FAFAFA" px={4} position="relative">
      
      <Heading 
        as="h1" 
        fontSize="5xl" 
        mb={8} 
        fontWeight="semibold" 
        letterSpacing="3px" 
      >
        <Text as="span" color="#0056D2">Search </Text>
        <Text 
          as="span" 
          bgGradient="linear(to-r, #0056D2 -10%, #8C14FC 40%)" 
          bgClip="text"
        >
          d_evs
        </Text>
      </Heading>

      <Flex w="100%" maxW="600px" gap={4} direction={{ base: 'column', sm: 'row' }} align={{ base: 'stretch', sm: 'flex-start' }}>
        
        <Box position="relative" w="100%" ref={wrapperRef}>
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none" h="100%">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            
            <Input
              placeholder={t('header.searchPlaceholder')} 
              bg="white"
              h="56px" 
              borderRadius="full" 
              boxShadow="sm"
              _hover={{ boxShadow: 'md' }}
              focusBorderColor="#8C14FC"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowHistory(true)}
              pl={12} 
            />
          </InputGroup>

          {showHistory && recentSearches.length > 0 && (
            <Box
              position="absolute"
              top="calc(100% + 8px)" 
              left={0}
              w="100%"
              bg="white"
              boxShadow="lg" 
              borderRadius="xl" 
              zIndex={10}
              overflow="hidden"
              border="1px solid"
              borderColor="gray.100"
            >
              <VStack align="stretch" spacing={0}>
                {recentSearches.map((username) => (
                  <Flex
                    key={username}
                    p={4} 
                    align="center"
                    gap={3}
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => handleHistoryClick(username)}
                  >
                    <Icon as={Clock} size={16} color="gray.400" />
                    <Text fontSize="md" color="gray.700" fontWeight="medium">
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
          h="56px"
          px={10}
          borderRadius="full"
          fontWeight="bold"
          boxShadow="sm"
          _hover={{ 
            bg: '#720bd1', 
            boxShadow: 'md', 
            transform: 'translateY(-2px)' 
          }}
          _active={{ 
            bg: '#5a08a8',
            transform: 'translateY(0)' 
          }}
          transition="all 0.2s"
          onClick={handleSearch}
        >
          {t('header.searchPlaceholder')}
        </Button>
      </Flex>

      <Flex mt={6} align="center" justify="center" gap={2}>
        <Text fontSize="sm" color="gray.500" fontWeight="medium">
          {i18n.language === 'pt' ? 'Idioma:' : 'Language:'}
        </Text>
        <Button 
          onClick={toggleLanguage} 
          size="xs" 
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