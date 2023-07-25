import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useColorMode } from "@chakra-ui/color-mode";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function Nav3() {
  const [dataPersediaan, setDataPersediaan] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");

  const fetchDataPersediaan = async () => {
    try {
      const responsePersediaan = await axios.get("http://localhost:3050/isi");
      setDataPersediaan(responsePersediaan.data); // Corrected property name
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPersediaan();
  }, []);

  return (
    <>
      <Flex
        w="full"
        bg="#edf3f8"
        p={5}
        alignItems="center"
        justifyContent="center"
      >
        <Table w="full" bg="white" color="blue.300">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Persediaan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPersediaan.map((item) => ( // Fixed mapping over dataPersediaan
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.price}</Td>
                <Td>{item.sisa}</Td> {/* Corrected property name */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default Nav3;
