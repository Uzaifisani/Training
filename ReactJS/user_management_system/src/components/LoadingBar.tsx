import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      direction="column"
      bg="gray.50"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      <Text mt={4} fontSize="lg" color="gray.700">
        {message}
      </Text>
    </Flex>
  );
};

export default Loading;