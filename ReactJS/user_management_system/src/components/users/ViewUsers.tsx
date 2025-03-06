import { Box, Flex, Heading, Avatar, Text, Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import useUserActions from "../../hooks/useUserActions";
import UserNotFound from "../sides/UserNotFound";
import Loading from "../sides/LoadingBar";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import ConfirmationPrompt from "../sides/ConfirmationPrompt";

const ViewUser = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const {
    userData,
    isLoading,
    isError,
    handleBack,
    handleDelete,
  } = useUserActions();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Loading />;
  if (isError) return <UserNotFound />;

  const handleUpdate = () => {
    setIsUpdateMode(true);
  };

  const handleCloseUpdate = () => {
    setIsUpdateMode(false);
  };

  const handleConfirmDelete = () => {
    if(userData){
    handleDelete(userData.id);
    }
    onClose();
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
      <Box bg={bgColor} p={6} borderRadius="md" boxShadow="md" maxW="500px" w="100%">
        <Flex justify="center" align="center" mb={4}>
          <Heading size="lg" color={textColor}>User Details</Heading>
        </Flex>
        {userData && (
          <>
            <Flex align="center" mb={4} justify="space-between">
              <Box>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>ID: {userData.id}</Text>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {userData.first_name} {userData.last_name}
                </Text>
                <Text fontSize="lg" color={textColor}>{userData.email}</Text>
              </Box>
              <Avatar name={userData.first_name} src={userData.avatar} size="xl" />
            </Flex>
            <Flex justify="space-between" mt={4}>
              <Button colorScheme="blue" onClick={handleBack}>Back</Button>
              <Button colorScheme="yellow" onClick={handleUpdate}>Update</Button>
              <Button colorScheme="red" onClick={onOpen}>Delete</Button>
            </Flex>
          </>
        )}
        {isUpdateMode && userData && (
          <UpdateUser userData={userData} onClose={handleCloseUpdate} />
        )}
        <ConfirmationPrompt
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirmDelete}
        />
      </Box>
    </Flex>
  );
};

export default ViewUser;
