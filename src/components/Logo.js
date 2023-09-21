import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "../assets/Logo.png";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
export default function Logo(props) {
  return (
    <Box {...props}>
      <ChakraLink as={ReactRouterLink} to="/">
        <Flex flexDirection={"row"} alignItems={"center"} gap={4}>
          <Image src={logo} alt="Logo" h={12} />{" "}
        </Flex>
      </ChakraLink>
    </Box>
  );
}
