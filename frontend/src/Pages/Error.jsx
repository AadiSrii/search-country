import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Error404 from "../assets/error.webp";

const Error = () => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      mt={24}
      mb={16}
    >
      <Image src={Error404} w={{base:"90%",md:"45%"}} />
      <NavLink to={"/"}>
        <Button colorScheme="gray">
          <ArrowBackIcon /> Go back to Homepage
        </Button>
      </NavLink>
    </Flex>
  );
};

export { Error };