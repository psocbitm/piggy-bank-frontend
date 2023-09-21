import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../features/user/userSlice";
import { toast } from "react-toastify";

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "", // Optional field
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }

      // Send a POST request to your API with the provided data
      const response = await axios.post(
        "http://localhost:8080/api/users/",
        formData
      );
      console.log(response);
      if (response.status === 201) {
        // Registration successful
        toast.success("User registered successfully!", {
          position: "top-right",
          autoClose: 3000, // Auto-close the toast after 3 seconds
        });

        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Save user data to Redux
        dispatch(setUserDetails(response.data));
        navigate("/user");
        // Redirect to the user page (if you have a routing mechanism in place)
        // history.push('/user'); // Import history if needed
      } else {
        // Handle registration errors
        setError("Registration failed. Please check your data.");
      }
    } catch (error) {
      console.error(error);
      // Handle network errors or other issues
      setError("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
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
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              border="1px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              type="text"
              value={formData.username}
              border="1px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
              onChange={handleInputChange}
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
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              border="1px"
              borderColor={useColorModeValue("gray.300", "gray.600")}
            />
          </FormControl>
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          {successMessage && (
            <Text color="green.500" fontSize="sm">
              {successMessage}
            </Text>
          )}
          <Stack spacing={10} pt={2}>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              type="submit"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default function Register() {
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
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.500"}>
              and easily manage your money and transactions.
            </Text>
          </Stack>
          <SignUpForm />
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
