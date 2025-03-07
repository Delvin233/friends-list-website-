import { Card, Flex, Strong, Text, Span, IconButton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import React from "react";
import { CiSquareRemove } from "react-icons/ci";
import EditUser from "./EditUser";
import { BASE_URL } from "@/App";

const UserCard = ({ user, setUsers }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(BASE_URL + "friends/" + user.identification, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== user.identification)
      );
      // toast from Chakra ui hasnt been configured well by me :( so lets use alerts like that
      alert("success");
    } catch (error) {
      alert("error");
    }
  };
  return (
    <Card.Root>
      <Card.Body>
        <Flex>
          <Flex flex={1} gap={4} alignItems={"center"} mb={3}>
            <Avatar src={user.imgUrl} />
            <Span>
              <Strong>{user.name}</Strong>
              <Text>{user.role}</Text>
            </Span>
          </Flex>
          <EditUser />
          <IconButton
            variant={"ghost"}
            colorPalette={"red"}
            size={"lg"}
            onClick={handleDelete}
          >
            <CiSquareRemove />
          </IconButton>
        </Flex>

        <Card.Description>
          <Text color="">{user.description}</Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
