import { Box, Flex, Skeleton, SkeletonCircle} from "@chakra-ui/react";

const UserListSkeleton = () => {
  return (
    <Box p={6} bg="white" borderRadius="lg" boxShadow="md" maxW="900px" w="100%">
      {/* Header Skeleton */}
      <Skeleton height="24px" width="150px" mb={4} />

      {/* User List Skeleton */}
      {[...Array(4)].map((_, index) => (
        <Flex key={index} align="center" justify="space-between" mb={4}>
          <Flex align="center">
            <SkeletonCircle size="12" mr={4} />
            <Box>
              <Skeleton height="16px" width="120px" mb={2} />
              <Skeleton height="12px" width="180px" />
            </Box>
          </Flex>
          <Skeleton height="30px" width="60px" borderRadius="md" />
        </Flex>
      ))}

      {/* Pagination Skeleton */}
      <Flex justify="space-between" mt={6} align="center">
        <Skeleton height="40px" width="80px" borderRadius="md" />
        <Skeleton height="20px" width="60px" />
        <Skeleton height="40px" width="80px" borderRadius="md" />
      </Flex>

      {/* Dropdown Skeleton */}
      <Flex justify="flex-end" mt={4}>
        <Skeleton height="40px" width="100px" borderRadius="md" />
      </Flex>
    </Box>
  );
};

export default UserListSkeleton;
