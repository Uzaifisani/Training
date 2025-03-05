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
  useToast,
} from "@chakra-ui/react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useUserJobStore } from "../store/userJobStore";
import AddJobModal from "./AddJob";
import ViewUser from "./ViewUser";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../apis/api";
import { UserJobResponse } from "../types";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserJobResponse|null>(null);
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const toast = useToast();
  const { userJobs, deleteUserJob } = useUserJobStore();

  const filteredJobs = userJobs.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (res: number, id) => {
      toast({
        title: `User id : ${id} deleted Successfully`,
        description: `Status Code : ${res}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      deleteUserJob(id);
    }
  });

  const deleteHandler = (id: number) => {
    deleteMutation.mutate(id);
  };

  const viewHandler = (user:UserJobResponse) => {
    setSelectedUser(user);
    onViewOpen();
  };

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
                        <MenuItem icon={<FiEye />} onClick={() => viewHandler(job)}>View</MenuItem>
                        <MenuItem icon={<FiEdit />} onClick={() => viewHandler(job)}>Edit</MenuItem>
                        <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => deleteHandler(job.id)}>
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
      <ViewUser isOpen={isViewOpen} onClose={onViewClose} user={selectedUser} />
    </Box>
  );
};

export default UserTable;
