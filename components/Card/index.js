
import { Image, Box, Flex, Text, Center, useColorMode, useColorModeValue } from "@chakra-ui/react";

export default function Card({ character, setCharacter }) {
    const { toggleColorMode } = useColorMode()
    const cardColor = useColorModeValue('#ccc', '#ec1d24')
    
    return character.map(character => (
        <Flex 
        key={character.id}
        alignItems='center'
        flexWrap='wrap'
        >
            <Box 
            maxW='sm' 
            borderTopRadius='lg'
            >
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    w="100%"
                    borderTopRadius='lg'
                    boxShadow='rgba(0, 0, 0, 0.16) 0px 2px 6px'
                    onClick={() => setCharacter(character)}
                />
                <Center p='2' borderBottomRadius='lg' bg={cardColor}>
                    <Text fontFamily='Marvel'>
                        {character.name}
                    </Text>
                </Center>
        </Box >
        </Flex>

    )
    )
}