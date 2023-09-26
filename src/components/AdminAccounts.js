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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  TableContainer,
} from "@chakra-ui/react";

const AccountRow = ({ account, onUpdate }) => (
  <Tr>
    <Td>{account.id}</Td>
    <Td>{account.accountNumber}</Td>
    <Td>{account.user?.username}</Td>
    <Td>{account.balance.toFixed(2)}</Td>
    <Td>
      <Button onClick={() => onUpdate(account)}>Update Balance</Button>
    </Td>
  </Tr>
);

const AdminAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    balance: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts/");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const openUpdateModal = (account) => {
    setSelectedAccount(account);
    setFormData({
      balance: account.balance.toFixed(2),
    });
    onOpen();
  };

  const updateAccountBalance = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/accounts/${selectedAccount.id}`,
        { balance: parseFloat(formData.balance) }
      );
      fetchAccounts();
      onClose();
    } catch (error) {
      console.error("Error updating account balance:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Box py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"} fontWeight="bold" mb={8}>
          Account List
        </Heading>
        <TableContainer size="md" borderRadius="lg" border="1px">
          <Table>
            <Thead>
              <Tr>
                <Th>Account ID</Th>
                <Th>Account Number</Th>
                <Th>Username</Th>
                <Th>Balance</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {accounts.map((account) => (
                <AccountRow key={account.id} account={account} onUpdate={openUpdateModal} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {selectedAccount && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Account Balance</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="balance"
                value={formData.balance}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                placeholder="New Balance"
                mb={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" ml={2} onClick={updateAccountBalance}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default AdminAccounts;
