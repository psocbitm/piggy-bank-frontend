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
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function AccountSummary() {
  const [accounts, setAccounts] = useState([]);
  const user = useSelector((state) => state.user.userDetails);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/accounts/user/${user.id}`)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }, []);

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
          </Tr>
        </Thead>
        <Tbody>
          {accounts.map((account, index) => (
            <Tr key={account.id}>
              <Td>{index + 1}</Td>
              <Td>{account.id}</Td>
              <Td>{account.accountNumber}</Td>
              <Td>₹{account.balance.toFixed(2)}</Td>
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
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}

export default AccountSummary;
