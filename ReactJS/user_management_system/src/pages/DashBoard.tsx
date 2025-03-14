import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../components/sides/Header";
import Sidebar from "../components/sides/Sidebar";
import RecentUsers from "../components/users/RecentUsers";
import useFetchUsers from "../hooks/useFetchUsers";
import Loading from "../components/sides/LoadingBar";

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isLoading,isError}=useFetchUsers();
  if(isLoading) return <Loading/>;
  if(isError) return <h2>Error in Fetching Data</h2>
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