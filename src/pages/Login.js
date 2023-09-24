import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Send a POST request to your API with the provided data
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData
      );

      if (response.status === 200) {
        // Login successful, handle success scenario here
        console.log("User logged in successfully!");
      } else {
        // Handle login errors, e.g., show an error message
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      // Handle network errors or other issues
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <Box
      rounded={"xl"}
      bg={useColorModeValue("gray.200", "gray.700")}
      boxShadow={"xl"}
      p={8}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              border="1px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                border="1px"
                borderColor={useColorModeValue("gray.300", "gray.600")}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() => setShowPassword((show) => !show)}
                  border="1px"
                  borderColor={useColorModeValue("gray.300", "gray.600")}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Logging in"
              type="submit"
              size="lg"
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.500",
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default function Login() {
  return (
    <Stack
      minH={"calc(100vh - 64px)"}
      direction={{ base: "column", md: "row" }}
      alignItems={"center"}
    >
      <Flex flex={1} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign In
            </Heading>
            <Text fontSize={"lg"} color={"gray.500"}>
              Welcome back! Please sign in to continue.
            </Text>
          </Stack>
          <SignInForm />
        </Stack>
      </Flex>
      <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
        <Player
          autoplay
          loop
          src="https://lottie.host/7d7f93b7-53c8-4868-a213-22823f3824b4/b60kcm8UBa.json"
          style={{ height: "700px", width: "auto" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </Flex>
    </Stack>
  );
}
