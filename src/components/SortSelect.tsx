import { Select, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const { t } = useTranslation();

  return (
    <Flex align="center" gap={3} mb={6} justify="flex-end">
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        {t('sort.label')}
      </Text>
      <Select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        w="auto" 
        bg="white"
        focusBorderColor="#8C14FC"
        size="sm"
        borderRadius="md"
      >
        <option value="updated">{t('sort.updated')}</option>
        <option value="created">{t('sort.created')}</option>
        <option value="pushed">{t('sort.pushed')}</option>
        <option value="full_name">{t('sort.fullName')}</option>
      </Select>
    </Flex>
  );
}