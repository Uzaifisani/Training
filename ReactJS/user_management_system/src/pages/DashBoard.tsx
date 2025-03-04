import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box transition="0.3s ease">
        <Header onOpen={onOpen} />
      </Box>
    </Box>
  );
};

export default DashBoard;