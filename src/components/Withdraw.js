import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function Withdraw() {
  const [sourceAccount, setSourceAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const user = useSelector((state) => state.user.userDetails);
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/accounts/user/${user.id}`
      );
      setAccounts(response.data);
    } catch (error) {
      handleApiError("fetching accounts", error);
    }
  };

  const handleApiError = (action, error) => {
    console.error(`Error ${action}:`, error);
  };

  const handleWithdraw = async () => {
    try {
      await axios.post("http://localhost:8080/api/transactions/withdraw", {
        sourceAccount: {
          id: sourceAccount,
        },
        amount: parseFloat(amount),
      });
      fetchAccounts();
      toast({
        title: "Withdrawal Successful",
        description: "The money has been withdrawn successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      clearForm();
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else {
        handleApiError("Withdrawing money", error);
      }
    }
  };

  const clearForm = () => {
    setSourceAccount("");
    setAmount("");
    setError("");
  };

  useEffect(() => {
    fetchAccounts();
  }, [user.id]);

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Withdraw Money</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="account-number">
              <FormLabel>Withdraw from</FormLabel>
              <Select
                placeholder="Select account"
                value={sourceAccount}
                onChange={(e) => setSourceAccount(e.target.value)}
              >
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber} - ₹{account.balance}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="amount">
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            {error && (
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
                onClick={handleWithdraw}
              >
                Withdraw Money
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Withdraw;
