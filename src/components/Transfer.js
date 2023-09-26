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
import { useDispatch, useSelector } from "react-redux";

function Transfer() {
  const [sourceAccount, setSourceAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("RTGS"); // Added transferType state
  const [error, setError] = useState("");
  const toast = useToast();
  const user = useSelector((state) => state.user.userDetails);
  const [accounts, setAccounts] = useState([]);
  const [payees, setPayees] = useState([]);

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

  const fetchPayees = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/payees/user/${user.id}`
      );
      setPayees(response.data);
    } catch (error) {
      handleApiError("fetching payees", error);
    }
  };

  const handleApiError = (action, error) => {
    console.error(`Error ${action}:`, error);
  };

  const handleTransfer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/transactions/transfer",
        {
          sourceAccount: {
            accountNumber: sourceAccount,
          },
          destinationAccount: {
            accountNumber: destinationAccount,
          },
          amount: parseFloat(amount),
          type: "TRANSFER_"+transferType, // Include transferType in the request
        }
      );

      console.log(destinationAccount);
      console.log(res);
      fetchAccounts();
      toast({
        title: "Transfer Successful",
        description: "The money has been transferred successfully.",
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
        handleApiError("transferring money", error);
      }
    }
  };

  const clearForm = () => {
    setSourceAccount("");
    setDestinationAccount("");
    setAmount("");
    setError("");
  };

  useEffect(() => {
    fetchAccounts();
    fetchPayees();
  }, [user.id]);

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Transfer Money</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="source-account">
              <FormLabel>Source Account</FormLabel>
              <Select
                placeholder="Select account"
                value={sourceAccount}
                onChange={(e) => setSourceAccount(e.target.value)}
              >
                {accounts.map((account) => (
                  <option key={account.id} value={account.accountNumber}>
                    {account.accountNumber} - ₹{account.balance} - {account.id}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="destination-account">
              <FormLabel>Destination Account</FormLabel>
              <Select
                placeholder="Select account"
                value={destinationAccount}
                onChange={(e) => setDestinationAccount(e.target.value)}
              >
                {payees.map((payee) => (
                  <option key={payee.id} value={payee.accountNumber}>
                    {payee.name} - {payee.accountNumber} - {payee.id}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="amount">
              <FormLabel>Amount</FormLabel>
              <Input
                border={"1px solid"}
                borderColor={useColorModeValue("gray.400", "gray.600")}
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <FormControl id="transfer-type"> {/* Added transfer type selection */}
              <FormLabel>Transfer Type</FormLabel>
              <Select
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
              >
                <option value="NEFT">NEFT - if destination account is in another bank</option>
                <option value="RTGS">RTGS - if destination account is in same bank</option>
              </Select>
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
                onClick={handleTransfer}
              >
                Transfer Money
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default Transfer;
