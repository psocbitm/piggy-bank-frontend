import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../features/user/userSlice";
import { toast } from "react-toastify";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...user });
  const [editMode, setEditMode] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    if (
      formData.fullName &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.phoneNumber
    ) {
      return true;
    } else {
      setValidationError("Please fill in all fields.");
      return false;
    }
  };

  const handleUpdate = async () => {
    if (validateFormData()) {
      try {
        // Send data to the backend but exclude id from the formData
        const { id, ...data } = formData;
        const response = await axios.put(
          `http://localhost:8080/api/users/${user.id}`,
          data
        );

        console.log(response);

        // Update user data in Redux store
        dispatch(setUserDetails(formData));
        toast.success("User updated successfully!");
        setEditMode(false);
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error and show an error message
        toast.error("Error updating user.");
      }
    }
  };

  return (
    <>
      <Heading textAlign="center" fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="full-name" fontWeight="normal">
            Full Name
          </FormLabel>
          <Input
            id="full-name"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="username" fontWeight="normal">
            Username
          </FormLabel>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </FormControl>
      </Flex>

      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight="normal">
          Email address
        </FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          disabled={!editMode}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight="normal" mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="password"
            name="password"
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={!editMode}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phone-number" fontWeight="normal" mt="2%">
          Phone Number
        </FormLabel>
        <InputGroup size="md">
          <Input
            id="phone-number"
            name="phoneNumber"
            pr="4.5rem"
            type="text"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </InputGroup>
      </FormControl>

      {validationError && <Box color="red">{validationError}</Box>}

      <Box mt={4}>
        {editMode ? (
          <>
            <Button
              bg="red.400"
              color="white"
              size="md"
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button
              bg="gray.400"
              color="white"
              size="md"
              onClick={() => setEditMode(false)}
              ml={2}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            bg="red.400"
            color="white"
            size="md"
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </Box>
    </>
  );
};

export default function Setting() {
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.5)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Form />
      </Box>
    </>
  );
}
