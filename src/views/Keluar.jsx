import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
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
  Icon,
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
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
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

function Nav4() {
  const [dataKeluar, setDataKeluar] = useState([]);
  const [userCondition, setUserCondition] = useState(false);
  const navigate = useNavigate();

  const fetchDataKeluar = async () => {
    try {
      const responseKeluar = await axios.get("http://localhost:3050/keluar");
      setDataKeluar(responseKeluar.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataKeluar();
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
            {dataKeluar.map((x, index) => (
              <Tr key={index}>
                <Td>{x.id}</Td>
                <Td>{x.name}</Td>
                <Td>{x.price}</Td>
                <Td>{x.kuantitas}</Td>
                <Td>{x.customer}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}

export default Nav4;
