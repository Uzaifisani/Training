import { Box, Button, Flex, FormControl, FormLabel, Input, useColorModeValue, Heading } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../types";
import { useEffect } from "react";
import useUpdateUser from "../../hooks/useUpdateUser";

interface UpdateUserProps {
  userData: User;
  onClose: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ userData, onClose }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const { completeUpdateMutation, partialUpdateMutation } = useUpdateUser(onClose);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<User>({
    defaultValues: userData,
  });

  useEffect(() => {
    setValue("first_name", userData.first_name);
    setValue("last_name", userData.last_name);
    setValue("email", userData.email);
    setValue("avatar", userData.avatar);
  }, [userData, setValue]);

  const onSubmitComplete: SubmitHandler<User> = (data) => {
    completeUpdateMutation.mutate(data);
  };

  const onSubmitPartial: SubmitHandler<User> = (data) => {
    partialUpdateMutation.mutate(data);
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
      <Box bg={bgColor} p={6} borderRadius="md" boxShadow="md" maxW="500px" w="100%">
        <Heading size="lg" color={textColor} mb={6}>Update User</Heading>
        <form onSubmit={handleSubmit(onSubmitComplete)}>
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
          <Button type="submit" colorScheme="blue" width="full" mb={4}>Complete Update</Button>
        </form>
        <form onSubmit={handleSubmit(onSubmitPartial)}>
          <Button type="submit" colorScheme="yellow" width="full">Partial Update</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default UpdateUser;
