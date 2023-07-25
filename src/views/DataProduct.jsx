import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  Alert,
  chakra ,
  Icon,
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
  Divider, VStack,
  InputGroup,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaFacebookF } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { GrInstagram } from 'react-icons/gr';
import { FaLinkedinIn } from 'react-icons/fa';
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

function Nav1() {
  const toast = useToast()
  const [dataProduct, setDataProduct] = useState([]);
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [userCondition, setUserCondition] = useState(false);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();


  const testClick = () => {
    setModal(false);
  };

  const fetchDataProduct = async () => {
    try {
      const responseProduct = await axios.get("http://localhost:3050/product");
      setDataProduct(responseProduct.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataProduct([]);
    }
  };
  
  useEffect(() => {
    fetchDataProduct();
  }, []);


  const handleAddProduct = async () => {
    try {
      setEditItem(null);
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (dataProduct) => {
    try {
      setEditItem(dataProduct);
      setModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (dataProduct) => {
    try {
      await axios.delete(`http://localhost:3050/product/${dataProduct.id}`, {
        data: { id: dataProduct.id },
      });
      console.log("Row deleted", dataProduct.id);
      fetchDataProduct();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmitProduct = async () => {
    if (editItem === null) {
      const newProductData = {
        name: name,
        price: price,
        quantity: quantity,
      };
      try {
        const response = await axios.post(
          "http://localhost:3050/product",
          qs.stringify(newProductData)
        );
        console.log(name, price, quantity);
        setModal(false);
        fetchDataProduct();
      } catch (error) {
        console.error(error);
      }
    } else {
      const updatedProductData = {
        name: name,
        price: price,
        quantity: quantity,
      };
      try {
        const response = await axios.put(
          `http://localhost:3050/product/${editItem.id}`,
          qs.stringify(updatedProductData)
        );
        console.log(updatedProductData, "tesyterssreyd");
        setModal(false);
        fetchDataProduct();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const bg = useColorModeValue("white", "gray.800");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
            <Flex w="full" bg="#edf3f8">
              <Button
                marginTop={"30px"}
                marginLeft={"50px"}
                colorScheme="blue"
                onClick={() => handleAddProduct()}
              >
                {" "}
                <SmallAddIcon /> Create Product
              </Button>
              <Modal
                onClose={testClick}
                isOpen={modal}
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormLabel>Name</FormLabel>
                    <Input
                      defaultValue={editItem?.name || ""}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormLabel>Price</FormLabel>
                    <Input
                      defaultValue={editItem?.price || ""}
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <FormLabel>QTY</FormLabel>
                    <Input
                      defaultValue={editItem?.quantity || ""}
                      type="text"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={testClick}>
                      Close
                    </Button>
                    <Button colorScheme="blue" onClick={() => handleSubmitProduct()}>
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
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
                    <Th>Quantity</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataProduct.map((k, index) => (
                    <Tr key={index}>
                      <Td>{k.id}</Td>
                      <Td>{k.name}</Td>
                      <Td>{k.price}</Td>
                      <Td>{k.quantity}</Td>
                      <Td>
                        
                        <ButtonGroup>
                          <Button
                            colorScheme="green"
                            onClick={() => handleUpdateProduct(k)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteProduct(k)}
                          >
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
    </>
  );
}

export default Nav1;
