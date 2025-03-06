import { useState } from "react";
import {
  Box,
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
  Button,
  HStack,
  Select,
  useColorModeValue,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { FiArrowUp, FiArrowDown, FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserStore } from "../../store/userStore";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";
import Loading from "../sides/LoadingBar";

const UserTable = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const navigate = useNavigate();

  const users = useUserStore((state) => state.users);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key: keyof User) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  const changePage = (direction: number) => {
    setCurrentPage((prev) => prev + direction);
  };
  const AddUserNav=()=>{
    navigate("/adduser");
  }

  if (!users.length) return <Loading />;

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color={textColor}>Users Management</Heading>
        <Button colorScheme="blue" onClick={AddUserNav}>Add User</Button>
      </Flex>
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        mb={4}
        bg={bgColor}
        color={textColor}
      />
      <Box bg={bgColor} p={4} borderRadius="md" boxShadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color={textColor} onClick={() => requestSort("id")}>
                ID {sortConfig?.key === "id" && (sortConfig.direction === "ascending" ? <FiArrowUp /> : <FiArrowDown />)}
              </Th>
              <Th color={textColor} onClick={() => requestSort("first_name")}>
                First Name {sortConfig?.key === "first_name" && (sortConfig.direction === "ascending" ? <FiArrowUp /> : <FiArrowDown />)}
              </Th>
              <Th color={textColor} onClick={() => requestSort("last_name")}>
                Last Name {sortConfig?.key === "last_name" && (sortConfig.direction === "ascending" ? <FiArrowUp /> : <FiArrowDown />)}
              </Th>
              <Th color={textColor} onClick={() => requestSort("email")}>
                Email {sortConfig?.key === "email" && (sortConfig.direction === "ascending" ? <FiArrowUp /> : <FiArrowDown />)}
              </Th>
              <Th color={textColor}>Avatar</Th>
              <Th textAlign="right" color={textColor}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <Tr key={user.id} onClick={() => handleRowClick(user.id)} cursor="pointer">
                  <Td color={textColor}>{user.id}</Td>
                  <Td color={textColor}>{user.first_name}</Td>
                  <Td color={textColor}>{user.last_name}</Td>
                  <Td color={textColor}>{user.email}</Td>
                  <Td>
                    <Avatar name={user.first_name} src={user.avatar} size="md" />
                  </Td>
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
                <Td colSpan={6} textAlign="center" color={textColor}>
                  No users found
                </Td> 
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <HStack mt={4} justifyContent="space-between">
        <Button onClick={() => changePage(-1)} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text>Page {currentPage}</Text>
        <Button onClick={() => changePage(1)} isDisabled={currentPage === Math.ceil(sortedUsers.length / itemsPerPage)}>
          Next
        </Button>
      </HStack>
      <HStack mt={4} justifyContent="flex-end">
        <Text>Show</Text>
        <Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          width="80px"
          ml={2}
        >
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
        </Select>
      </HStack>
    </Box>
  );
};

export default UserTable;
