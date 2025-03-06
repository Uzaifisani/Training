import { Box, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserNotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.100">
      <Box
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
        maxW="md"
      >
        {/* Warning Icon */}
        <Icon as={FiAlertTriangle} boxSize={16} color="red.400" mb={4} />

        {/* Message */}
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          User Not Found
        </Text>
        <Text fontSize="md" color="gray.600" mt={2}>
          The user you are looking for does not exist or may have been removed.
        </Text>

        {/* Back Button */}
        <Button
          colorScheme="blue"
          mt={6}
          size="lg"
          onClick={() => navigate("/dashboard/users")}
        >
          Back to Users
        </Button>
      </Box>
    </Flex>
  );
};

export default UserNotFound;
