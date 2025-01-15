import { Card, Flex, Strong, Text, Span, IconButton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import React from "react";
import { CiSquareRemove } from "react-icons/ci";
import EditUser from "./EditUser";

const UserCard = ({ user }) => {
  return (
    <Card.Root>
      <Card.Body>
        <Flex>
          <Flex flex={1} gap={4} alignItems={"center"} mb={3}>
            <Avatar src="https://avatar.iran.liara.run/public" />
            <Span>
              <Strong>{user.name}</Strong>
              <Text>{user.role}</Text>
            </Span>
          </Flex>
          <EditUser />
          <IconButton variant={"ghost"} colorPalette={"red"} size={"lg"}>
            <CiSquareRemove />
          </IconButton>
        </Flex>

        <Card.Description>
          <Text color="fg">{user.description}</Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default UserCard;
