import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        px={4}
        position={"fixed"}
        w={"100vw"}
        zIndex={9999}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Logo title="Online Banking System" />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={4}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <ChakraLink as={ReactRouterLink} to="/login">
                <Button>Log in</Button>
              </ChakraLink>
              <ChakraLink as={ReactRouterLink} to="/register">
                <Button>Sign up</Button>
              </ChakraLink>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
