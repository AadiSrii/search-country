import { Box, Button, Image, Text, useToast, VStack, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function CountryCard({ item }) {
  const filteredCountry = {
    name: item.name.common,
    currency: Object.values(item.currencies)
      .map((c) => c.name)
      .join(", "),
    capital: item.capital ? item.capital[0] : "Capital detail not available",
    languages: item.languages
      ? Object.values(item.languages).join(", ")
      : "Languages not available",
    flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
  };

  const { favoriteList, setFavoriteList } = useContext(DataContext);
  const toast = useToast();

  const handleClick = (item) => {
    if (favoriteList.some((fav) => fav.cca2 === item.cca2)) {
      toast({
        title: "Already in Favorites",
        description: "This country is already in your favorite list.",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setFavoriteList([...favoriteList, item]);
      toast({
        title: "Added to Favorites",
        description: `${filteredCountry.name} has been added to your favorite list.`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      p="4"
      w="280px"
      boxShadow="lg"
      bg="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      _hover={{
        shadow: "xl",
        transform: "scale(1.05)",
        transition: "all 0.3s ease",
      }}
      whileHover={{ scale: 1.05, boxShadow: "xl" }}
      whileTap={{ scale: 0.98 }}
    >
      <Tooltip label={`Flag of ${filteredCountry.name}`} fontSize="md" aria-label={`Flag of ${filteredCountry.name}`}>
        <Image
          src={filteredCountry.flag}
          alt={`Flag of ${filteredCountry.name}`}
          mb="4"
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
          border="3px solid"
          borderColor="teal.300"
        />
      </Tooltip>
      <Text fontSize="xl" fontWeight="semibold" mb="2" textAlign="center" color="teal.600">
        {filteredCountry.name}
      </Text>
      <Text mb="2" fontSize="md" color="gray.600" textAlign="center">
        <strong>Currency:</strong> {filteredCountry.currency}
      </Text>
      <Text mb="2" fontSize="md" color="gray.600" textAlign="center">
        <strong>Capital:</strong> {filteredCountry.capital}
      </Text>
      <Text mb="4" fontSize="md" color="gray.600" textAlign="center">
        <strong>Languages:</strong> {filteredCountry.languages}
      </Text>
      <Button
        colorScheme="teal"
        onClick={() => handleClick(item)}
        _hover={{ bg: "teal.500", transform: "scale(1.05)" }}
        _active={{ bg: "teal.600" }}
        size="lg"
        w="full"
      >
        Add to Favorites
      </Button>
    </MotionBox>
  );
}

export { CountryCard };
  