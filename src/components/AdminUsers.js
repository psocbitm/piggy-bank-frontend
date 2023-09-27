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
  Flex,
  TableContainer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserRow = ({ user, onUpdate, lockUser, unlockUser }) => (
  <Tr>
    <Td>{user.id}</Td>
    <Td>{user.username}</Td>
    <Td>{user.fullName}</Td>
    <Td>{user.email}</Td>
    <Td>{user.phoneNumber}</Td>
    <Td>
      <Flex gap={5}>
        <Button onClick={() => onUpdate(user)}>Update</Button>
        <Button
          onClick={
            user?.userStatus === "ACTIVE"
              ? () => lockUser(user)
              : () => unlockUser(user)
          }
        >
          {user?.userStatus === "ACTIVE" ? "Lock" : "Unlock"}
        </Button>
      </Flex>
    </Td>
  </Tr>
);

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const loggedInUserId = useSelector((state) => state.user.userDetails.id);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/");
      const filteredUsers = response.data.filter(
        (user) => user.id !== loggedInUserId
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const unlockUser = async (user) => {
    try {
      await axios.post(`http://localhost:8080/api/users/unlockUser/${user.id}`, {
        id: loggedInUserId,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error unlocking user:", error);
    }
  };

  const lockUser = async (user) => {
    try {
      await axios.post(`http://localhost:8080/api/users/lockUser/${user.id}`, {
        id: loggedInUserId,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error locking user:", error);
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
    onOpen();
  };

  const updateUserData = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/users/${selectedUser.id}`,
        formData
      );
      fetchUsers();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box minH={"calc(100vh - 64px)"} align={"start"} justify={"center"}>
      <Box py={12} px={6}>
        <Heading fontSize={"4xl"} textAlign={"center"} fontWeight="bold" mb={8}>
          User List
        </Heading>
        <TableContainer size="md" borderRadius="lg" border="1px">
          <Table>
            <Thead>
              <Tr>
                <Th>user ID</Th>
                <Th>Username</Th>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onUpdate={openUpdateModal}
                  lockUser={lockUser}
                  unlockUser={unlockUser}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      {selectedUser && (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                mb={3}
              />
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                mb={3}
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                mb={3}
              />
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                mb={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" ml={2} onClick={updateUserData}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default AdminUsers;
