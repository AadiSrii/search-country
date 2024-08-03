import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { CountryCard } from "../components/CountryCard";
import { Box, Flex, Heading, Stack, Text, Icon, Button } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";

const Favourite = () => {
  const { favoriteList } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const totalPages = Math.ceil(favoriteList.length / cardsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedList = favoriteList.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <Box
      mt={{ base: "60px", md: "80px" }}
      p={{ base: "4", md: "8", lg: "12" }}
      bgGradient="linear(to-r, teal.100, blue.50)"
      minH="100vh"
    >
      <Stack spacing="4" align="center" mb="8">
        <Icon as={HiHeart} boxSize="10" color="red.400" />
        <Heading textAlign="center" color="teal.800">
          Your Favorite Countries
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Here are the countries you've marked as favorites. You can explore more about them by clicking on the cards.
        </Text>
      </Stack>
      <Flex
        wrap={"wrap"}
        gap={{ base: "12px", md: "20px" }}
        justify={"center"}
        p={{ base: "6", md: "10" }}
      >
        {displayedList.length > 0 ? (
          displayedList.map((item, index) => (
            <CountryCard key={index} item={item} />
          ))
        ) : (
          <Text fontSize="lg" color="gray.500">
            No favorite countries yet. Start adding some!
          </Text>
        )}
      </Flex>
      <Stack spacing="4" align="center" mt="8">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme="teal"
        >
          Previous
        </Button>
        <Text fontSize="lg" color="gray.600">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme="teal"
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export { Favourite };
