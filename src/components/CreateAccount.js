import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const [error, setError] = useState(""); // State variable for error message
  const toast = useToast();
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const handleCreateAccount = async () => {
    try {
      const userId = user.id; // Replace with your actual user ID.

      const res = await axios.post(
        `http://localhost:8080/api/accounts/?userId=${userId}`
      );
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000, // Toast will disappear after 5 seconds
        isClosable: true,
      });
      console.log(res);
      setError("");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "") {
          toast({
            title: "You need to complete your profile first",
            description: "Please complete your profile first.",
            status: "error",
            duration: 5000, // Toast will disappear after 5 seconds
            isClosable: true,
          });

          navigate("/settings");
        } else {
          setError(errorMessage); // Set the error message state
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create an Account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error && ( // Conditional rendering of error message
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
            <Stack spacing={10}>
              <Button
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                onClick={handleCreateAccount}
              >
                Tap to create an Account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CreateAccount;
