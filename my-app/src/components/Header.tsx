'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Text, Input, Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      router.push(`/profile/${searchValue}`);
      setSearchValue('');
    }
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

      <Input
        placeholder={t('header.searchPlaceholder')} 
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

      <Button onClick={toggleLanguage} size="sm" variant="outline" colorScheme="purple">
        {i18n.language === 'pt' ? 'EN' : 'PT'}
      </Button>
    </Flex>
  );
}