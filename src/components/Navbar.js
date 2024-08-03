import React from "react";
import {
    Flex,
    Box,
    Heading,
    useColorMode,
    Button,
    Spacer
} from "@chakra-ui/react";

const Navbar = () => {
const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Box padding="2rem">
            <Flex alignItems="center" >
                <Heading>Weather App</Heading>
                <Spacer />
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                </Button>
            </Flex>
        </Box>
    );
};

export default Navbar;

