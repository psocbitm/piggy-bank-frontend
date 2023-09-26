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
  TableContainer,
} from "@chakra-ui/react";

const TransactionRow = ({ transaction }) => (
  <Tr>
    <Td>{transaction.id}</Td>
    <Td>{transaction.type}</Td>
    <Td>{transaction.amount.toFixed(2)}</Td>
    <Td>
      {transaction.sourceAccount ? transaction.sourceAccount.accountNumber : "N/A"}
    </Td>
    <Td>
      {transaction.destinationAccount ? transaction.destinationAccount.accountNumber : "N/A"}
    </Td>
  </Tr>
);

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/transactions/");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Box py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"} fontWeight="bold" mb={8}>
          Transaction List
        </Heading>
        <TableContainer size="md" borderRadius="lg" border="1px">
          <Table>
            <Thead>
              <Tr>
                <Th>Transaction ID</Th>
                <Th>Type</Th>
                <Th>Amount</Th>
                <Th>Source Account</Th>
                <Th>Destination Account</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminTransactions;
