import { Select, Flex, Text } from '@chakra-ui/react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Flex align="center" gap={3} mb={6} justify="flex-end">
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        Ordenar por:
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
        <option value="updated">Última atualização</option>
        <option value="created">Data de criação</option>
        <option value="pushed">Último commit</option>
        <option value="full_name">Nome em ordem alfabética</option>
      </Select>
    </Flex>
  );
}