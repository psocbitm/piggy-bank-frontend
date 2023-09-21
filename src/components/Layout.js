import React from "react";
import Navbar from "./Navbar";
import { Box, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";

function Layout(props) {
  return (
    <Flex flexDirection={"column"} minH={"100vh"}>
      <Box>
        {<Navbar />}
        <Box mt={"64px"} bg={
          useColorModeValue("gray.300", "gray.800")
        }>{props.children}</Box>
      </Box>
    </Flex>
  );
}

export default Layout;
