import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';

export function ProfileSkeleton() {
  return (
    <Flex w="100%" maxW="1200px" mx="auto" px={4} gap={8} direction={{ base: 'column', md: 'row' }} align="flex-start" mt={8}>
      
      <Box w={{ base: '100%', md: '300px' }} bg="white" p={6} borderRadius="md" boxShadow="sm">
        <Flex align="center" gap={4} mb={6}>
          <SkeletonCircle size="16" />
          <Box flex="1">
            <Skeleton height="20px" mb="2" />
            <Skeleton height="15px" width="60%" />
          </Box>
        </Flex>
        
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" mb={6} />
        
        <VStack align="start" spacing={4} mb={8}>
          <Skeleton height="15px" width="80%" />
          <Skeleton height="15px" width="70%" />
          <Skeleton height="15px" width="90%" />
        </VStack>

        <Skeleton height="40px" w="100%" borderRadius="md" />
      </Box>

      <Box flex={1} w="100%" bg="white" p={6} borderRadius="md" boxShadow="sm">
        <Flex justify="flex-end" mb={8}>
          <Skeleton height="30px" width="200px" borderRadius="md" />
        </Flex>
        
        <VStack align="stretch" spacing={6}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} borderBottom="1px solid" borderColor="gray.100" pb={6}>
              <Skeleton height="24px" width="40%" mb={4} />
              <SkeletonText noOfLines={2} spacing="3" skeletonHeight="2" />
              <Skeleton height="15px" width="30%" mt={4} />
            </Box>
          ))}
        </VStack>
      </Box>

    </Flex>
  );
}