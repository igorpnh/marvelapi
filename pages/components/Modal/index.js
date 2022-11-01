import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Image,
  Center,
  Spinner,
  SimpleGrid,
  Box,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

import api from '../../api/apiConfig';
import React, { useState, useEffect } from 'react';


const CharacterModal = ({ character, open, setOpen }) => {
  const { toggleColorMode } = useColorMode()
  const textColor = useColorModeValue('#ec1d24', '#ccc')
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);
  const { isOpen, onClose } = useDisclosure({
    onClose() {
      setOpen(!open);
      setComics([]);
    },
    isOpen: open,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setLoading(true);
    const fatchComics = async () => {
      try {
        const { data } = await api.get(`/characters/${character?.id}/comics`, {
          params: {
            orderBy: "-onsaleDate",
            limit: 8,
          },
        });
        setComics(data.data.results);
        setLoading(false);
      } catch (err) {
        console.log(err, "Não foi possível encontrar")
        setLoading(false);
      }
    };
    fatchComics();
  }, [character]);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={scrollBehavior}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{character?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
            w="100"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            rounded={"md"}
          />
          <Center textAlign='center' mt='3'>
            {character?.description ? character?.description : <Center color={textColor}>Nenhuma descrição encontrada 😓</Center>}
          </Center>

          <Divider mt='5' />

          {/*Se Loading for true, irá ativar o spinner, se não irá realizar o .map nos comics para exibir */}
          {loading ? (
            <Center h="100px">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="#ccc"
                color="#ec1d24"
                size="xl"
              />
            </Center>
          ) : comics.length > 0 ? (
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={5}
              mt={5}
            >
              {comics.map((comic) => (
                <Box key={comic?.id}>
                  <Image
                    src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                    w="250px"
                    boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                    rounded={"md"}
                  />
                  <Box>{comic.title}</Box>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Center
              mt={5}
              color={textColor}
            >
              Nenhum Quadrinho Econtrado 😓
            </Center>
          )}
        </ModalBody>

        <ModalFooter>


        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CharacterModal;