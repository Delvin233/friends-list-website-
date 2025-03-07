import { Stack, Container, Text, Toaster } from "@chakra-ui/react";
import Navbar from "./components/ui/Navbar";
import UserGrid from "./components/ui/UserGrid";
import { useState } from "react";

export const BASE_URL = "http://127.0.0.1:5000/api/";
function App() {
  const [users, setUsers] = useState([]);
  //  the set users was done in the App.jsx file because it would be used in the nav bar as well

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers} />

      <Container maxW={"1200px"} my={4}>
        <Text
          textAlign={"center"}
          fontWeight={500}
          fontSize={{ base: "25px", md: "50px" }}
          letterSpacing={2}
          mb={8}
          mt={0}
        >
          <Text
            as={"span"}
            bgClip={"text"}
            bgGradient="to-r"
            gradientFrom="red.400"
            gradientTo="blue.600"
          >
            MY BESTIES
          </Text>
          🚀
        </Text>
        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
