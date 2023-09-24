import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  useColorModeValue,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

function TransactionHistory() {
  const user = useSelector((state) => state.user.userDetails);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/user/${user.id}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user.id]);

  const getTotalAmount = () => {
    return transactions.reduce((total, transaction) => {
      return (
        total +
        (transaction.type === "DEPOSIT"
          ? transaction.amount
          : -transaction.amount)
      );
    }, 0);
  };

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Box py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"} fontWeight="bold" mb={8}>
          Transaction History
        </Heading>
        <TableContainer
          size="md"
          borderRadius="lg"
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Table>
            <Thead>
              <Tr bg={useColorModeValue("gray.50", "gray.800")}>
                <Th>Type</Th>
                <Th>Source Account</Th>
                <Th>Destination Account</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{transaction.type}</Td>
                  <Td>
                    {transaction.sourceAccount
                      ? `${transaction.sourceAccount.accountNumber}`
                      : "-"}
                  </Td>
                  <Td>
                    {transaction.destinationAccount
                      ? `${transaction.destinationAccount.accountNumber}`
                      : "-"}
                  </Td>
                  <Td>₹{transaction.amount}</Td>
                </Tr>
              ))}
              <Tr>
                <Td colSpan={3} textAlign="right">
                  <Text fontWeight="bold">Total:</Text>
                </Td>
                <Td>
                  <Text fontWeight="bold">{getTotalAmount()}</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default TransactionHistory;
