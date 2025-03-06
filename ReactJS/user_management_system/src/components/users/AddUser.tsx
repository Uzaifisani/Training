import { Box, Button, Flex, FormControl, FormLabel, Input, useColorModeValue, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";
import useUserActions from "../../hooks/useUserActions";

const AddUser = () => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const navigate = useNavigate();
  const {onSubmitAddUser}= useUserActions();
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const handleBack = () => {
    navigate("/dashboard/users");
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
      <Box bg={bgColor} p={6} borderRadius="md" boxShadow="md" maxW="500px" w="100%">
        <Button colorScheme="blue" mb={4} onClick={handleBack}>Back</Button>
        <Heading size="lg" color={textColor} mb={6}>Add User</Heading>
        <form onSubmit={handleSubmit(onSubmitAddUser)}>
          <FormControl id="first_name" mb={4} isInvalid={!!errors.first_name}>
            <FormLabel color={textColor}>First Name</FormLabel>
            <Input
              type="text"
              {...register("first_name", { required: "First name is required" })}
              bg={bgColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="last_name" mb={4} isInvalid={!!errors.last_name}>
            <FormLabel color={textColor}>Last Name</FormLabel>
            <Input
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              bg={bgColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="email" mb={4} isInvalid={!!errors.email}>
            <FormLabel color={textColor}>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              bg={bgColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="avatar" mb={4} isInvalid={!!errors.avatar}>
            <FormLabel color={textColor}>Avatar URL</FormLabel>
            <Input
              type="text"
              {...register("avatar", { required: "Avatar URL is required" })}
              bg={bgColor}
              color={textColor}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Add User</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default AddUser;