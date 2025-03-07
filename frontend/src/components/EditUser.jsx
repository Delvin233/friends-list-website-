import { IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { RiEditFill } from "react-icons/ri";
import { Input, Stack, Textarea, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

const EditUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure has depriciated
  return (
    <>
      <PopoverRoot>
        <PopoverTrigger asChild>
          <IconButton
            variant={"ghost"}
            colorPalette={"yellow"}
            onClick={onOpen}
            onClose={onClose}
            isOpen={onOpen}
          >
            <RiEditFill />
          </IconButton>
        </PopoverTrigger>

        <PopoverContent fontweight={"bold"} width={"500px"}>
          <PopoverArrow />

          <PopoverBody>
            <Stack gap="4">
              <Flex gap={4}>
                <Field label="Full name">
                  <Input placeholder="Bread Mafia" />{" "}
                </Field>{" "}
                <Field label="Role">
                  <Input placeholder="Dancer" />
                </Field>
              </Flex>

              <Field label="Description">
                <Textarea placeholder="He likes to do dance" />
              </Field>
              <Flex flex={1}>
                <Button variant={"surface"} mr={0} colorPalette="yellow">
                  Edit
                </Button>
              </Flex>
            </Stack>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

export default EditUser;
