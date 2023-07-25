import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  Alert,
  chakra,
  AlertIcon,
  Image,
  HStack,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
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
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedinIn } from "react-icons/fa";
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

function Nav2() {
  const toast = useToast();
  const [dataPersediaan, setDataPersediaan] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataStok, setDataStok] = useState([]);
  const [dataStoks, setDataStoks] = useState([]);
  const [product_id, setProductId] = useState([]);
  const [kuantitas, setKuantitas] = useState([]);
  const [keterangan, setKeterangan] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [modal, setModal] = useState(false);
  const [userCondition, setUserCondition] = useState(false);
  const [editStokItem, setEditStokItem] = useState(null);
  const [modalEditStok, setModalEditStok] = useState(false);
  const [alert, setAlert] = useState(false);
  const [newSisa, setNewSisa] = useState(null);
  const navigate = useNavigate();

  const fetchDataPersediaan = async () => {
    try {
      const responsePersediaan = await axios.get("http://localhost:3050/isi");
      setDataPersediaan(responsePersediaan.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataStok = async () => {
    try {
      const responseStok = await axios.get("http://localhost:3050/stok");
      setDataStok(responseStok.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataProduct = async () => {
    try {
      const responseProduct = await axios.get("http://localhost:3050/product");
      setDataProduct(responseProduct.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataStoks = async () => {
    try {
      const responseStoks = await axios.get("http://localhost:3050/stoks");
      setDataStoks(responseStoks.data);
    } catch (error) {
      console.error(error);
    }
  };

 

  const handleAddStok = async () => {
    try {
      setEditStokItem(null);
      setModalEditStok(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStok = async (dataStok) => {
    try {
      setEditStokItem(dataStok);
      setModalEditStok(true);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(editStokItem,'stok')
  const testClick = () => {
    setModal(false);
  };

  const handleDeleteStok = async (dataStok) => {
    try {
      await axios.delete(`http://localhost:3050/stok/${dataStok.id}`, {
        data: { id: dataStok.id },
      });
      console.log("Row deleted", dataStok.id);
      fetchDataStoks();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmitEditStok = async () => {
    if (editStokItem === null) {
      const newStokData = {
        product_id: product_id,
        kuantitas: kuantitas,
        keterangan: keterangan,
        customer: customer,
      };
      const newData = [...dataPersediaan];
      newData.forEach((item) => {
        if (item.id == newStokData.product_id) {
          if (keterangan == "Masuk") {
            const newSisa = item.sisa + newStokData.kuantitas;
            console.log(item.sisa, newStokData.kuantitas, newSisa, "jjjjj");
            item.sisa = newSisa;
            const setDatas = async () => {
              try {
                const response = await axios.post(
                  `http://localhost:3050/stok`,
                  qs.stringify(newStokData)
                );
                console.log(product_id, kuantitas, keterangan, customer);
                setModalEditStok(false);
                fetchDataStoks();
              } catch (error) {
                console.error(error);
              }
            };
            setDatas();
          } else {
            const newSisa = item.sisa - newStokData.kuantitas;
            console.log(item.sisa, newStokData.kuantitas, newSisa, "jjjjj");
            if (newSisa < 0) {
              toast({
                title: "Stok Kurang.",
                description: "Persediaan barang kurang.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            } else {
              // Jika stok mencukupi, lakukan perubahan pada elemen array newData
              item.sisa = newSisa;
              const setDatas = async () => {
                try {
                  const response = await axios.post(
                    `http://localhost:3050/stok`,
                    qs.stringify(newStokData)
                  );
                  console.log(product_id, kuantitas, keterangan, customer);
                  setModalEditStok(false);
                  fetchDataStoks();
                } catch (error) {
                  console.error(error);
                }
              };
              setDatas();
            }
          }
        }
      });
    } else {
      const updatedStokData = {
        product_id: product_id,
        kuantitas: kuantitas,
        keterangan: keterangan,
        customer: customer,
      };
      const newData = [...dataPersediaan];
      newData.forEach((item) => {
        if (item.id == updatedStokData.product_id) {
          if (keterangan == "Masuk") {
            const newSisa = item.sisa + updatedStokData.kuantitas;
            console.log(item.sisa, updatedStokData.kuantitas, newSisa, "jjjjj");
            // Jika stok mencukupi, lakukan perubahan pada elemen array newData
            item.sisa = newSisa;
            const setDatas = async () => {
              try {
                const response = await axios.put(
                  `http://localhost:3050/stok/${editStokItem.id}`,
                  qs.stringify(updatedStokData)
                );
                console.log(product_id, kuantitas, keterangan, customer);
                setModalEditStok(false);
                fetchDataStoks();
              } catch (error) {
                console.error(error);
              }
            };
            setDatas();
          } else {
            const newSisa = item.sisa - updatedStokData.kuantitas;
            console.log(item.sisa, updatedStokData.kuantitas, newSisa, "jjjjj");
            if (newSisa < 0) {
              toast({
                title: "Stok Kurang.",
                description: "Persediaan barang kurang.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
              return;
            } else {
              // Jika stok mencukupi, lakukan perubahan pada elemen array newData
              item.sisa = newSisa;
              const setDatas = async () => {
                try {
                  const response = await axios.put(
                    `http://localhost:3050/stok/${editStokItem.id}`,
                    qs.stringify(updatedStokData)
                  );
                  console.log(product_id, kuantitas, keterangan, customer);
                  setModalEditStok(false);
                  fetchDataStoks();
                } catch (error) {
                  console.error(error);
                }
              };
              setDatas();
            }
          }
        }
      });
    }
  };

 useEffect(() => {
    fetchDataPersediaan();
    fetchDataProduct();
    fetchDataStok();
    fetchDataStoks();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.800");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>

            <Flex w="full" bg="#edf3f8">
              <Button
                marginLeft={"50px"}
                colorScheme="blue"
                onClick={() => handleAddStok()}
              >
                {" "}
                <SmallAddIcon /> Edit Stok
              </Button>
              <Modal
                onClose={() => setModalEditStok(false)}
                isOpen={modalEditStok}
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit Stok</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormLabel>Name Product</FormLabel>
                    <Select
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="Select option"
                    >
                      {dataProduct.map((o, index) => (
                        <option key={`data3-${index}`} value={o.id}>
                          {o.id} = {o.name}
                        </option>
                      ))}
                    </Select>
                    <FormLabel>Kuantitas</FormLabel>
                    <Input
                      defaultValue={editStokItem?.kuantitas || ""}
                      type="text"
                      onChange={(e) => setKuantitas(e.target.value)}
                    />
                    <FormLabel>Keterangan</FormLabel>
                    <Select
                      placeholder="Select option"
                      onChange={(e) => setKeterangan(e.target.value)}
                    >
                      <option value="Masuk">Masuk</option>
                      <option value="Keluar">Keluar</option>
                    </Select>
                    <FormLabel>Customer</FormLabel>
                    <Input
                      defaultValue={editStokItem?.customer || ""}
                      type="text"
                      onChange={(e) => setCustomer(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      onClick={() => setModalEditStok(false)}
                    >
                      Close
                    </Button>
                    <Button colorScheme="blue" onClick={handleSubmitEditStok}>
                      Submit
                    </Button>
                    {alert && (
                      <Alert status="error">
                        <AlertIcon />
                        Stok habis cuy
                      </Alert>
                    )}
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
                    <Th>Product_Id</Th>
                    <Th>Kuantitas</Th>
                    <Th>Keterangan</Th>
                    <Th>Customer</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataStoks.map((l, index) => (
                    <Tr key={index}>
                      <Td>{l.id}</Td>
                      <Td>{l.name}</Td>
                      <Td>{l.kuantitas}</Td>
                      <Td>{l.keterangan}</Td>
                      <Td>{l.customer}</Td>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="green"
                            onClick={() => handleUpdateStok(l)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDeleteStok(l)}
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

export default Nav2;
