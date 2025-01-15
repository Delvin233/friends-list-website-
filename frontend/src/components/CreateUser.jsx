import React from "react";
import { IoIosCreate } from "react-icons/io";
import { Input, Stack, Textarea, Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { HStack } from "@chakra-ui/react";
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

const CreateUser = () => {
  const [value, setValue] = useState("1");

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
            <Stack gap="4">
              <Text fontweight={"bolder"}> New Friend 🧑‍🤝‍🧑</Text>
              <Flex>
                <Field label="Fullname">
                  <Input placeholder="Bread Mafia" />
                </Field>
                <Field label="Role">
                  <Input placeholder="Dancer" />
                </Field>
              </Flex>

              <Field label="Description">
                <Textarea placeholder="He likes to do dance" />
              </Field>

              <RadioGroup
                value={value}
                onValueChange={(e) => setValue(e.value)}
              >
                <HStack gap="6" mt={1}>
                  <Radio value="male">male</Radio>
                  <Radio value="female">female</Radio>
                </HStack>
              </RadioGroup>

              <Button
                variant={"ghost"}
                bgGradient="to-r"
                gradientFrom="red.400"
                gradientTo="blue.600"
                fontweight={"bolder"}
              >
                Add
              </Button>
            </Stack>
          </PopoverBody>
          <PopoverCloseTrigger />
        </PopoverContent>
      </PopoverRoot>
    </>
  );
};

export default CreateUser;
