import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserStore } from "../store/userStore";
import Loading from "./LoadingBar";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const { users, page, limit, totalPages, setPage, fetchUsers } = useUserStore();

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  if (!users.length) return <Loading />;

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color={textColor}>Users</Heading>
        <Button colorScheme="blue">Add User</Button>
      </Flex>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
        bg={bgColor}
        color={textColor}
      />
      <Box bg={bgColor} p={4} borderRadius="md" boxShadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={textColor}>Avatar</Th>
              <Th color={textColor}>Name</Th>
              <Th color={textColor}>Email</Th>
              <Th textAlign="right" color={textColor}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td>
                    <Avatar name={`${user.first_name} ${user.last_name}`} src={user.avatar} />
                  </Td>
                  <Td color={textColor}>{`${user.first_name} ${user.last_name}`}</Td>
                  <Td color={textColor}>{user.email}</Td>
                  <Td textAlign="right">
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<FiMoreVertical />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem icon={<FiEye />}>View</MenuItem>
                        <MenuItem icon={<FiEdit />}>Edit</MenuItem>
                        <MenuItem icon={<FiTrash2 />} color="red.500">
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={4} textAlign="center" color={textColor}>
                  No users found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Flex justify="space-between" mt={4} align="center">
        <Text fontSize="sm" color={textColor}>Showing {filteredUsers.length} of {users.length} users</Text>
        <Flex>
          <Button size="sm" variant="ghost" onClick={() => setPage(Math.max(page - 1, 1))} isDisabled={page === 1}>
            &lt; Previous
          </Button>
          <Button size="sm" variant="ghost" ml={2} onClick={() => setPage(page + 1)} isDisabled={page === totalPages}>
            Next &gt;
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserTable;
