import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
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
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

function ManagePayees() {
  const [payees, setPayees] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [newPayee, setNewPayee] = useState({
    name: "",
    accountNumber: "",
    nickname: "",
  });
  const [error, setError] = useState("");
  const toast = useToast();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/payees/user/${user.id}`)
      .then((response) => {
        setPayees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payees:", error);
      });
  }, [user.id]);

  const handleUpdatePayee = (payee) => {
    if (!payee.name || !payee.accountNumber || !payee.nickname) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios
      .put(`http://localhost:8080/api/payees/${payee.id}`, payee)
      .then(() => {
        toast({
          title: "Payee Updated",
          description: "Payee information has been updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEditMode({ ...editMode, [payee.id]: false });
      })
      .catch((error) => {
        console.error("Error updating payee:", error);
      });
  };

  const handleDeletePayee = (payeeId) => {
    axios
      .delete(`http://localhost:8080/api/payees/${payeeId}`)
      .then(() => {
        toast({
          title: "Payee Deleted",
          description: "Payee has been deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setPayees(payees.filter((payee) => payee.id !== payeeId));
      })
      .catch((error) => {
        console.error("Error deleting payee:", error);
      });
  };

  const handleAddPayee = () => {
    if (!newPayee.name || !newPayee.accountNumber || !newPayee.nickname) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios
      .post(`http://localhost:8080/api/payees/${user.id}`, newPayee)
      .then((response) => {
        toast({
          title: "Payee Added",
          description: "New payee has been added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setNewPayee({ name: "", accountNumber: "", nickname: "" });
        setPayees([...payees, response.data]);
        setError(""); // Clear the error message
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          toast({
            title: "Error Adding Payee",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          console.error(
            "Error adding payee:",
            "You need to create an account first."
          );
        }
      });
  };

  return (
    <Box
      minH={"calc(100vh - 64px)"}
      align={"start"}
      justify={"center"}
      w={"100%"}
    >
      <Stack spacing={8} mx={"auto"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Manage Payees</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={4}>
          <Flex alignItems="end" justifyContent="space-between" gap={10}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={newPayee.name}
                onChange={(e) =>
                  setNewPayee({ ...newPayee, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="accountNumber">
              <FormLabel>Account Number</FormLabel>
              <Input
                type="text"
                value={newPayee.accountNumber}
                onChange={(e) =>
                  setNewPayee({
                    ...newPayee,
                    accountNumber: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl id="nickname">
              <FormLabel>Nickname</FormLabel>
              <Input
                type="text"
                value={newPayee.nickname}
                onChange={(e) =>
                  setNewPayee({ ...newPayee, nickname: e.target.value })
                }
              />
            </FormControl>
            <Button colorScheme="red" size="md" onClick={handleAddPayee}>
              <FaPlus />
            </Button>
          </Flex>
          {error && (
            <Text color="red" mt={2}>
              {error}
            </Text>
          )}
        </Box>

        {payees.length > 0 ? (
          <Box rounded={"lg"} boxShadow={"lg"} p={4}>
            {payees.map((payee) => (
              <Box key={payee.id} mb={5}>
                <Flex alignItems="end" justifyContent="space-between" gap={10}>
                  <FormControl id={`name-${payee.id}`}>
                    <FormLabel>Name</FormLabel>
                    <Input
                    
                      type="text"
                      value={payee.name}
                      isDisabled={!editMode[payee.id]}
                      onChange={(e) => {
                        const updatedPayees = [...payees];
                        const index = updatedPayees.findIndex(
                          (item) => item.id === payee.id
                        );
                        updatedPayees[index].name = e.target.value;
                        setPayees(updatedPayees);
                      }}
                    />
                  </FormControl>
                  <FormControl id={`accountNumber-${payee.id}`}>
                    <FormLabel>Account Number</FormLabel>
                    <Input
                    
                      type="text"
                      value={payee.accountNumber}
                      isDisabled={!editMode[payee.id]}
                      onChange={(e) => {
                        const updatedPayees = [...payees];
                        const index = updatedPayees.findIndex(
                          (item) => item.id === payee.id
                        );
                        updatedPayees[index].accountNumber = e.target.value;
                        setPayees(updatedPayees);
                      }}
                    />
                  </FormControl>
                  <FormControl id={`nickname-${payee.id}`}>
                    <FormLabel>Nickname</FormLabel>
                    <Input
                     
                      type="text"
                      value={payee.nickname}
                      isDisabled={!editMode[payee.id]}
                      onChange={(e) => {
                        const updatedPayees = [...payees];
                        const index = updatedPayees.findIndex(
                          (item) => item.id === payee.id
                        );
                        updatedPayees[index].nickname = e.target.value;
                        setPayees(updatedPayees);
                      }}
                    />
                  </FormControl>
                  <Flex gap={5}>
                    {editMode[payee.id] ? (
                      <>
                        <Button
                          colorScheme="red"
                          size="md"
                          onClick={() => handleUpdatePayee(payee)}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          colorScheme="red"
                          size="md"
                          onClick={() => {
                            // Disable edit mode without saving changes
                            setEditMode({ ...editMode, [payee.id]: false });
                          }}
                        >
                          <FaTimes />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          colorScheme="red"
                          size="md"
                          onClick={() => {
                            // Enable edit mode for this payee
                            setEditMode({ ...editMode, [payee.id]: true });
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          colorScheme="red"
                          size="md"
                          onClick={() => handleDeletePayee(payee.id)}
                        >
                          <FaTrash />
                        </Button>
                      </>
                    )}
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          <Text>No payees found.</Text>
        )}
      </Stack>
    </Box>
  );
}

export default ManagePayees;
