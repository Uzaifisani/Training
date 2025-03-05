import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "../components/sides/Header";
import Sidebar from "../components/sides/Sidebar";
import RecentUsers from "../components/RecentUsers";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import UserTable from "../components/User";

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const [dashboard, setDashboard] = useState<Boolean>(true);

  useEffect(() => {
    const extractedPath = location.pathname.split('/').pop();
    if (extractedPath === "dashboard") {
      setDashboard(true);
    } else if (extractedPath === "users") {
      setDashboard(false);
    }
  }, [location.pathname]);

  return (
    <Box minH="100vh">
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: 30 }} transition="0.3s ease">
        <Header onOpen={onOpen} />
        <Box p={4} ml={{ base: 0, md: 60 }}>
          {dashboard && <RecentUsers />}
          {!dashboard && <UserTable />}
        </Box>
      </Box>
    </Box>
  );
};

export default DashBoard;