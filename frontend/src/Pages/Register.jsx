import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../util/vars";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = state;

    if (!name || !email || !password) {
      toast({
        title: "Username, Email, and Password are required",
        status: "error",
        duration: 4000,
        position: "center",
        isClosable: true,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email Address",
        status: "error",
        duration: 4000,
        position: "center",
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/users/register`, { name, email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast({
        title: "Registration Successful!",
        description: "You can now log in with your credentials.",
        status: "success",
        duration: 4000,
        position: "center",
        isClosable: true,
      });

      setState({ name: "", email: "", password: "" });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Registration failed.",
        status: "error",
        duration: 4000,
        position: "center",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      mt={{ base: "40px", md: "70px" }}
      p={{ base: "4", md: "6" }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={0} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Create a New Account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={5}>
            <FormControl id="name" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Enter your username"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter your email"
                _placeholder={{ color: 'gray.500' }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  _placeholder={{ color: 'gray.500' }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={4}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"purple.700"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                width={"95%"}
                margin={"auto"}
                onClick={handleOnSubmit}
                isLoading={loading}
              >
                Register
              </Button>
              <Text align={"center"}>
                Already have an account?{" "}
                <Link as={RouterLink} color={"blue.400"} to="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export { Register };
