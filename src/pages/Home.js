import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import HeroSection from "../components/HeroSection";

function Home() {
  return (
    <Box>
      <Flex
        minH={"calc(100vh - 64px)"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <HeroSection />
      </Flex>
    </Box>
  );
}

export default Home;
