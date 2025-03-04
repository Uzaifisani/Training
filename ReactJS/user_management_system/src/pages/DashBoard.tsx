import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import RecentUsers from "../components/RecentUsers";

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: 30 }} transition="0.3s ease">
        <Header onOpen={onOpen} />
          <Box p={4} ml={{ base: 0, md: 60 }}>
          <RecentUsers />
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;