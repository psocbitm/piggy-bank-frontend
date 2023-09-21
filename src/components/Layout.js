import React from "react";
import Navbar from "./Navbar";
import { Box, Flex } from "@chakra-ui/react";

function Layout(props) {
  return (
    <Flex flexDirection={"column"} minH={"100vh"}>
      <Box>
        {<Navbar />}
        <Box mt={"64px"}>{props.children}</Box>
      </Box>
    </Flex>
  );
}

export default Layout;
