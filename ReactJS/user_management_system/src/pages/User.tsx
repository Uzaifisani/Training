import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../components/sides/Header";
import Sidebar from "../components/sides/Sidebar";
import UserTable from "../components/users/UserTable";

const User = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: 30 }} transition="0.3s ease">
        <Header onOpen={onOpen} />
        <Box p={4} ml={{ base: 0, md: 60 }}>
             <UserTable />
        </Box>
      </Box>
    </Box>
  );
};

export default User;