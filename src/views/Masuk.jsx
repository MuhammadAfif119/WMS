import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Icon,
  Button,
  Menu,
  chakra,
  Alert,
  AlertIcon,
  Image,
  HStack,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tab,
  Text,
  InputLeftAddon,
  Input,
  TableCaption,
  TableContainer,
  Divider,
  VStack,
  InputGroup,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import {
  MoonIcon,
  Search2Icon,
  SunIcon,
  SmallAddIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import qs from "qs";

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

function Nav5() {
  const [dataMasuk, setDataMasuk] = useState([]);
  const [userCondition, setUserCondition] = useState(false);
  const navigate = useNavigate();

  const fetchDataMasuk = async () => {
    try {
      const responseMasuk = await axios.get("http://localhost:3050/masuk");
      setDataMasuk(responseMasuk.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataMasuk();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Flex
        w="full"
        bg="#edf3f8"
        p={50}
        alignItems="center"
        justifyContent="center"
      >
        <Table w="full" bg="white" color="blue.300">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>QTY</Th>
              <Th>Customer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataMasuk.map((y, index) => (
              <Tr key={index}>
                <Td>{y.id}</Td>
                <Td>{y.name}</Td>
                <Td>{y.price}</Td>
                <Td>{y.kuantitas}</Td>
                <Td>{y.customer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default Nav5;
