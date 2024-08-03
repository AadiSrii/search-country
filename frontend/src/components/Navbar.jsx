import { Box, Flex, Button, useToast, useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../util/vars";
import { HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const Links = [
    { name: "Country", path: "/" },
    { name: "Favourite", path: "/favorite" },
    { name: "History", path: "/history" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      setAuth({
        isAuth: false,
        username: "",
        accessToken: "",
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={"#f4f4f9"} 
      px={{ base: 4, md: 10 }} 
      py={3}
      borderBottom={"2px solid #d1d1d6"} 
      position={"fixed"}
      top={0}
      w={"100%"}
      zIndex={4}
      shadow={"md"}
    >
      <Flex h={14} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"xl"} 
          icon={isOpen ? <CloseIcon boxSize={6} /> : <HamburgerIcon boxSize={6} />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant={"outline"}
          borderColor={"RED"} 
          color={"BLUE"} 
        />
        <Box
          onClick={() => navigate("/")}
          _hover={{ cursor: "pointer", color: "ORANGE" }}
          fontSize={"2xl"} 
          fontWeight={"bold"}
          color={"RED"} 
        >
         <a href="#">COUNTRY'S ENCYCLOPDIA</a>
        </Box>

        <HStack as={"nav"} spacing={8} display={{ base: "none", md: "flex" }}>
          {Links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? "BLUE" : "#555", 
                fontWeight: isActive ? "bold" : "normal", 
                textDecoration: "none",
                padding: "8px 16px", 
                borderRadius: "4px", 
                _hover: { backgroundColor: "RED" } 
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </HStack>
        <Flex gap={{ base: "4px", md: "8px" }} alignItems={"center"}>
          {auth.isAuth ? (
            <Button
              bg={"#BA3B93"}
              _hover={{ bg: "#ff50c9" }}
              color={"white"}
              size={"sm"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                bg={"BLUE"}
                _hover={{ bg: "GREEN" }}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                bg={"BLUE"}
                _hover={{ bg: "GREEN" }}
                color={"white"}
                size={"sm"}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? "#BA3B93" : "#555",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  display: "block",
                  _hover: { backgroundColor: "#f0e4f4" }
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export { Navbar };
