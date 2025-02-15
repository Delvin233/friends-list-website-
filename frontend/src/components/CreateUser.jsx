"use client";
import React from "react";
import { IoIosCreate } from "react-icons/io";
import {
  Input,
  Stack,
  Textarea,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { HStack, createToaster } from "@chakra-ui/react";
import { useState } from "react";

import { Radio, RadioGroup } from "@/components/ui/radio";
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BASE_URL } from "@/App";

const CreateUser = () => {
  // const [open, onOpen, onClose] = useDisclosure();
  const [isLoading, setisLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  const toast = createToaster();

  const handleCreateUser = async (e) => {
    e.preventDefault(); // prevent page refresh
    setisLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "success",
        title: "Nice!",
        description: "Friend Added Successfully.",
        duration: 2000,
        position: "top-center",
      });
      //onClose();
    } catch (error) {
      toast({
        status: "error",
        title: "An error occured.!",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setisLoading(false);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      }); // clear inputs
    }
  };

  return (
    <>
      <PopoverRoot>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline">
            <IoIosCreate />
          </Button>
        </PopoverTrigger>

        <PopoverContent bg="white.200" fontweight={"bold"}>
          <PopoverArrow />

          <PopoverBody>
            <form onSubmit={handleCreateUser()}>
              <Stack gap="4">
                <Text fontweight={"bolder"}> New Friend 🧑‍🤝‍🧑</Text>
                <Flex>
                  <Field label="Fullname">
                    <Input
                      placeholder="Bread Mafia"
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Role">
                    <Input
                      placeholder="Dancer"
                      value={inputs.role}
                      onChange={(e) =>
                        setInputs({ ...inputs, role: e.target.value })
                      }
                    />
                  </Field>
                </Flex>

                <Field label="Description">
                  <Textarea
                    placeholder="He likes to do dance"
                    value={inputs.description}
                    onChange={(e) =>
                      setInputs({ ...inputs, description: e.target.value })
                    }
                  />
                </Field>

                <RadioGroup
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <HStack gap="6" mt={1}>
                    <Radio
                      value="male"
                      onChange={(e) =>
                        setInputs({ ...inputs, gender: e.target.value })
                      }
                    >
                      male
                    </Radio>
                    <Radio
                      value="female"
                      onChange={(e) =>
                        setInputs({ ...inputs, gender: e.target.value })
                      }
                    >
                      female
                    </Radio>
                  </HStack>
                </RadioGroup>

                <Button
                  variant={"ghost"}
                  bgGradient="to-r"
                  gradientFrom="red.400"
                  gradientTo="blue.600"
                  fontweight={"bolder"}
                  type="submit"
                  isLoading={isLoading}
                >
                  Add
                </Button>
              </Stack>
            </form>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

export default CreateUser;
