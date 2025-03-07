import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserCard from "../UserCard";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/friends");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    };
    getUsers();
  }, [setUsers]);
  console.log(users);

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2 , 1fr)",
          lg: "repeat(3 , 1fr)",
        }}
        gap={10}
      >
        {users.map((user) => (
          <UserCard key={user.identification} user={user} setUsers={setUsers} />
        ))}
      </Grid>

      {isLoading && (
        <Flex justifyContent={"center"} alignContent={"center"} mt={250}>
          <Spinner
            color="red.500"
            css={{ "--spinner-track-color": "colors.blue.200" }}
            size={"xl"}
          />
        </Flex>
      )}
      {isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text size={"xl"} mt={20}>
            {" "}
            No friends available
          </Text>
        </Flex>
      )}
    </>
  );
};

export default UserGrid;
