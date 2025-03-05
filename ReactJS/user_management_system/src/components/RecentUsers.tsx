import { Box, Flex, Heading, Avatar, Text, Badge, VStack, useColorModeValue, Button, HStack, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import Loading from "./sides/LoadingBar";

const RecentUsers = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const { users, page, limit, totalPages, setPage, setLimit, fetchUsers } = useUserStore();
  useEffect(() => {
    setPage(1);
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  if (!users.length) return <Loading />;

  return (
    <>
      <Heading fontSize="xx-large" mb={4} color={textColor}>
        Dashboard
      </Heading>
      <Box p={6} maxW="800px" bg={bgColor} boxShadow="md" borderRadius="lg">
        <Heading fontSize="xl" mb={4} color={textColor}>
          Recent Users
        </Heading>
        <VStack align="stretch" spacing={4}>
          {users.map((user) => (
            <Flex key={user.id} align="center" justify="space-between" p={3} borderBottom={`1px solid ${borderColor}`}>
              <Flex align="center">
                <Avatar name={user.first_name} src={user.avatar} size="md" mr={3} />
                <Box>
                  <Text fontWeight="bold" color={textColor}>{`${user.first_name} ${user.last_name}`}</Text>
                  <Text fontSize="sm" color="gray.500">{user.email}</Text>
                </Box>
              </Flex>
              <Badge colorScheme="blue" px={2} py={1} borderRadius="md">ACTIVE</Badge>
            </Flex>
          ))}
        </VStack>
        <HStack mt={4} justifyContent="space-between">
          <Button onClick={() => setPage(Math.max(page - 1, 1))} isDisabled={page === 1}>
            Previous
          </Button>
          <Text>Page {page}</Text>
          <Button onClick={() => setPage(page + 1)} isDisabled={page === totalPages}>
            Next
          </Button>
        </HStack>
        <HStack mt={4} justifyContent="flex-end">
          <Text>Show</Text>
          <Select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            width="80px"
            ml={2}
          >
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
          </Select>
        </HStack>
      </Box>
    </>
  );
};

export default RecentUsers;
