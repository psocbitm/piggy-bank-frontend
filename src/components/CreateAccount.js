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

function CreateAccount() {
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState(""); // State variable for error message
  const toast = useToast();
  const user = useSelector((state) => state.user.userDetails);
  const handleCreateAccount = async () => {
    try {
      // Assuming you have a variable 'userId' that holds the user's ID.
      const userId = user.id; // Replace with your actual user ID.

      // Make the Axios POST request to create an account
      const response = await axios.post(
        `http://localhost:8080/api/accounts/${userId}`,
        {
          accountNumber: accountNumber,
          balance: balance,
        }
      );

      // Show a success toast
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000, // Toast will disappear after 5 seconds
        isClosable: true,
      });

      // Clear the input fields and error message
      setAccountNumber("");
      setBalance("");
      setError("");
    } catch (error) {
      // Display the error message from the response
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setError(errorMessage); // Set the error message state
      } else {
        console.error("Error creating account:", error);
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
            <FormControl id="account-number">
              <FormLabel>Account Number</FormLabel>
              <Input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </FormControl>
            <FormControl id="balance">
              <FormLabel>Balance</FormLabel>
              <Input
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </FormControl>
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
                Create Account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default CreateAccount;
