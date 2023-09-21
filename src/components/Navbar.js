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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.userDetails);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        pl={8}
        pr={4}
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
              {user ? (
                <>

                  <Button onClick={toggleColorMode}>Account</Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"lg"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{user.username}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <ChakraLink as={ReactRouterLink} to="/login">
                    <Button>Log in</Button>
                  </ChakraLink>
                  <ChakraLink as={ReactRouterLink} to="/register">
                    <Button>Sign up</Button>
                  </ChakraLink>
                </>
              )}
              
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
