import React from "react";
import { Container, Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { FaUserFriends } from "react-icons/fa";
import CreateUser from "../CreateUser";

const Navbar = ({ setUsers }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("red.200", "red.700")}
      >
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Text
              variant="blend"
              fontSize="3xl"
              as={"span"}
              bgGradient="to-r"
              gradientFrom="red.400"
              gradientTo="blue.600"
            >
              <FaUserFriends />
            </Text>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              All Your Friends In One Place
            </Text>
          </Flex>
          <Flex gap={3} alignContent={"center"}>
            <Text
              fontSize={"lg"}
              fontWeight={500}
              display={{ base: "none", md: "block" }}
            >
              Welcome 👾
            </Text>
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
            <CreateUser setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
