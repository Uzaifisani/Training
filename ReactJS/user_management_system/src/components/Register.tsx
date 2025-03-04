import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/input";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { FormValues, LoginRegisterFormValues, RegisterResponse } from "../types";
import {  Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../apis/api";



const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast= useToast();
  const navigate= useNavigate();

  const registerMutation=useMutation({
    mutationFn:(data:LoginRegisterFormValues)=>registerApi(data),
    onSuccess:(res:RegisterResponse)=>{
      toast({
        title: "Account Created Successful!",
        description: `Now login, ID: ${res.id} `,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    },
    onError:(error:Error)=>{
        toast({
          title: "Invalid Credentials!",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        p={8}
        maxW="400px"
        w="full"
        boxShadow="lg"
        bg="black"
        borderRadius="lg"
      >
        <Heading fontSize="2xl" mb={4} textAlign="center">
          Create an Account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={!!errors.email} mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password} mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Must be at least 6 characters" },
                })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Toggle password visibility"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword} mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Toggle confirm password visibility"
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt={4}>
            Register
          </Button>
        </form>
        <Text mt={4} textAlign="center" fontSize="sm">
          Already have an account?{" "}
          <Link  to="/">
            Log in
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
