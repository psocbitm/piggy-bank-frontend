import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function AccountSummary() {
  const [accounts, setAccounts] = useState([]);
  const user = useSelector((state) => state.user.userDetails);
  const toast = useToast();
  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/accounts/user/${user.id}`
      );
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    try {
      await axios.delete(`http://localhost:8080/api/accounts/${accountId}`);
      await fetchAccounts(); // Refresh account list after deletion
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the account.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user.id]);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Account Summary
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Sr. No.</Th>
            <Th>Account ID</Th>
            <Th>Account Number</Th>
            <Th>Balance</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accounts.map((account, index) => (
            <Tr key={account.id}>
              <Td>{index + 1}</Td>
              <Td>{account.id}</Td>
              <Td>{account.accountNumber}</Td>
              <Td>₹{account.balance.toFixed(2)}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td>
              <Text fontWeight="bold">
                Total: ₹
                {accounts
                  .reduce((total, account) => total + account.balance, 0)
                  .toFixed(2)}
              </Text>
            </Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default AccountSummary;
