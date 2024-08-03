import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Box, Heading, Text, Stack, Icon, Divider, VStack } from "@chakra-ui/react";
import { HiClock } from "react-icons/hi";

const History = () => {
  const { historyList } = useContext(DataContext);

  return (
    <Box
      mt={{ base: "60px", md: "80px" }}
      p={{ base: "4", md: "8", lg: "12" }}
      bgGradient="linear(to-r, blue.100, teal.100)"
      minH="100vh"
    >
      <Stack spacing="6" align="center" mb="8">
        <Icon as={HiClock} boxSize="12" color="gray.600" />
        <Heading color="teal.800">History</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Here you can view the history of your actions. Each entry is listed below.
        </Text>
      </Stack>
      <VStack spacing="4" align="stretch" maxW="container.sm" mx="auto">
        {historyList.length > 0 ? (
          historyList.map((item, index) => (
            <Box
              key={index}
              p="4"
              borderWidth="1px"
              borderRadius="md"
              bg="white"
              boxShadow="md"
              _hover={{ bg: "teal.50", borderColor: "teal.300" }}
              transition="background 0.3s ease, border-color 0.3s ease"
            >
              <Text fontSize="md" color="gray.700">
                {item}
              </Text>
            </Box>
          ))
        ) : (
          <Text fontSize="lg" color="gray.500">
            No history available.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export { History };
