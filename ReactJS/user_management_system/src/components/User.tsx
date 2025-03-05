import { useState } from "react";
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
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserJobStore } from "../store/userJobStore";
import AddJobModal from "./AddJob";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userJobs } = useUserJobStore();

  const filteredJobs = userJobs.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color={textColor}>Jobs</Heading>
        <Button colorScheme="blue" onClick={onOpen}>Add Job</Button>
      </Flex>
      <Input
        placeholder="Search jobs..."
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
              <Th color={textColor}>ID</Th>
              <Th color={textColor}>Job Name</Th>
              <Th color={textColor}>Job</Th>
              <Th textAlign="right" color={textColor}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Tr key={job.id}>
                  <Td color={textColor}>{job.id}</Td>
                  <Td color={textColor}>{job.name}</Td>
                  <Td color={textColor}>{job.job}</Td>
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
                  No jobs found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <AddJobModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UserTable;
