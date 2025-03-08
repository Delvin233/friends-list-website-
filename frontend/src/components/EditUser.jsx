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
import { BASE_URL } from "@/App";
import { useState } from "react";

const EditUser = ({ user, setUsers }) => {
  const [isLoading, setisLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure has depriciated
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
  });

  const handleEdit = async (e) => {
    e.preventDefault(); // prevent page refresh... event.prevent refresh of page :)
    setisLoading(true);
    try {
      const res = await fetch(BASE_URL + "friends/" + user.identification, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      //toaster.create({
      // type: "success",
      //title: "Nice!",
      //description: "Friend Added Successfully.",
      //duration: 2000,
      //position: "top-end",
      // });
      //onClose();
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.identification === user.identification ? data : u
        )
      );
      alert("success");
    } catch (error) {
      alert("error");
      //toaster.create({
      //type: "error",
      //title: "An error occured.!",
      //description: error.message,
      //duration: 2000,
      //position: "top-end",
      //});
    } finally {
      setisLoading(false);
    }
  };
  return (
    <>
      <PopoverRoot>
        <PopoverTrigger asChild>
          <IconButton
            variant={"ghost"}
            colorPalette={"yellow"}
            //onClick={onOpen}
            //onClose={onClose}
            //isOpen={onOpen}
          >
            <RiEditFill />
          </IconButton>
        </PopoverTrigger>

        <PopoverContent fontweight={"bold"} width={"500px"}>
          <PopoverArrow />
          <form onSubmit={handleEdit}>
            <PopoverBody>
              <Stack gap="4">
                <Flex gap={4}>
                  <Field label="Full name">
                    <Input
                      placeholder="Bread Mafia"
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />{" "}
                  </Field>{" "}
                  <Field label="Role">
                    <Input
                      placeholder="Dancer"
                      value={inputs.role}
                      onChange={(e) =>
                        setInputs((prev) => ({ ...prev, role: e.target.value }))
                      }
                    />
                  </Field>
                </Flex>

                <Field label="Description">
                  <Textarea
                    placeholder="He likes to do dance"
                    value={inputs.description}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Flex flex={1}>
                  <Button
                    variant={"surface"}
                    mr={0}
                    colorPalette="yellow"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Edit
                  </Button>
                </Flex>
              </Stack>
            </PopoverBody>
          </form>

          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

export default EditUser;
