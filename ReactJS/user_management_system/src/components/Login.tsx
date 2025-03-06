import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { LoginRegisterFormValues, LoginResponse } from "../types";
import { useMutation } from "@tanstack/react-query";
import { login } from "../apis/api";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const boxColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const LoginMutation = useMutation({
    mutationFn: (data: LoginRegisterFormValues) => login(data),
    mutationKey: ["login"],
    onSuccess: (token: LoginResponse, data) => {
      storeLogin(JSON.stringify(token), data.email);
      setLoading(false);
      toast({
        title: "Login Successful!",
        description: `Welcome, ${data.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      setLoading(false);
      toast({
        title: "Invalid Credentials!",
        description: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRegisterFormValues>();

  const onSubmit = (data: LoginRegisterFormValues) => {
    setLoading(true);
    LoginMutation.mutate(data);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
      <Box p={8} maxW="400px" w="full" bg={boxColor} boxShadow="lg" borderRadius="md">
        <Heading mb={6} textAlign="center" size="lg" color={textColor}>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email} mb={4}>
            <FormLabel color={textColor}>Email address</FormLabel>
            <Input type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <Text color="red.500" fontSize="sm">{errors.email.message}</Text>}
          </FormControl>

          <FormControl id="password" isInvalid={!!errors.password} mb={4}>
            <FormLabel color={textColor}>Password</FormLabel>
            <Input type="password" {...register("password", { required: "Password is required" })} />
            {errors.password && <Text color="red.500" fontSize="sm">{errors.password.message}</Text>}
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            isLoading={loading}
          >
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center" fontSize="sm" color={textColor}>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
