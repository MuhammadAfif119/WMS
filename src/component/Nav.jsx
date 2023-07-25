// import { ReactNode } from "react";
// import {
//   Box,
//   Flex,
//   Avatar,
//   Link,
//   Button,
//   Menu,
//   Alert,
//   AlertIcon,
//   Image,
//   Select,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   useDisclosure,
//   useColorModeValue,
//   Stack,
//   useColorMode,
//   Center,
//   Tabs,
//   TabList,
//   TabPanels,
//   TabPanel,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Tab,
//   Text,
//   InputLeftAddon,
//   Input,
//   TableCaption,
//   TableContainer,
//   InputGroup,
//   FormLabel,
//   useToast,
// } from "@chakra-ui/react";
// import {
//   MoonIcon,
//   Search2Icon,
//   SunIcon,
//   SmallAddIcon,
//   DeleteIcon,
//   EditIcon,
// } from "@chakra-ui/icons";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   ButtonGroup,
//   IconButton,
// } from "@chakra-ui/react";
// import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
// import { AiFillEdit } from "react-icons/ai";
// import { auth } from "../config/firebase";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import qs from "qs";

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );

// function Navx() {
//   const toast = useToast()
//   const [data, setData] = useState([]);
//   const [data1, setData1] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [data4, setData4] = useState([]);
//   const [name, setName] = useState([]);
//   const [price, setPrice] = useState([]);
//   const [quantity, setQuantity] = useState([]);
//   const [product_id, setProductId] = useState([]);
//   const [kuantitas, setKuantitas] = useState([]);
//   const [keterangan, setKeterangan] = useState([]);
//   const [customer, setCustomer] = useState([]);
//   const [userCondition, setUserCondition] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [editStokItem, setEditStokItem] = useState(null);
//   const [modalEditStok, setModalEditStok] = useState(false);
//   const [alert, setAlert] = useState(false);
// const [newSisa, setNewSisa] = useState(null)
//   const navigate = useNavigate();

//   const handleSetting = () => {
//     try {
//       navigate("/pp");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUserCondition(false);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3050/isi");
//         setData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchData1 = async () => {
//       try {
//         const response1 = await axios.get("http://localhost:3050/keluar");
//         setData1(response1.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchData2 = async () => {
//       try {
//         const response2 = await axios.get("http://localhost:3050/masuk");
//         setData2(response2.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   const fetchData3 = async () => {
//     try {
//       const response3 = await axios.get("http://localhost:3050/product");
//       setData3(response3.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//     fetchData1();
//     fetchData2();
//     fetchData3();
//     fetchData4();
//     const interval = setInterval(fetchData, 1000); // Memuat ulang data setiap 5 detik
//     return () => clearInterval(interval);
//   }, []);

 
//     const fetchData4 = async () => {
//       try {
//         const response4 = await axios.get("http://localhost:3050/stok");
//         setData4(response4.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   const handleAdd = async () => {
//     try {
//       setEditItem(null);
//       setModal(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddStok = async () => {
//     try {
//       setEditStokItem(null);
//       setModalEditStok(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (data3) => {
//     try {
//       setEditItem(data3);
//       setModal(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateStok = async (data4) => {
//     try {
//       setEditStokItem(data4);
//       setModalEditStok(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// // console.log(editStokItem,'stok')
//   const testClick = () => {
//     setModal(false);
//   };

//   const handleDelete = async (data3) => {
//     try {
//       await axios.delete(`http://localhost:3050/product/${data3.id}`, {
//         data: { id: data3.id },
//       });
//       console.log("Row deleted", data3.id);
//       fetchData3();
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   const handleDeleteStok = async (data4) => {
//     try {
//       await axios.delete(`http://localhost:3050/stok/${data4.id}`, {
//         data: { id: data4.id },
//       });
//       console.log("Row deleted", data4.id);
//       fetchData4();
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };

//   const handleSubmit = async () => {
//     if (editItem === null) {
//       const newProductData = {
//         name: name,
//         price: price,
//         quantity: quantity,
//       };
//       try {
//         const response = await axios.post(
//           "http://localhost:3050/product",
//           qs.stringify(newProductData)
//         );
//         console.log(name, price, quantity);
//         setModal(false);
//         fetchData3();
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       const updatedProductData = {
//         name: name,
//         price: price,
//         quantity: quantity,
//       };
//       try {
//         const response = await axios.put(
//           `http://localhost:3050/product/${editItem.id}`,
//           qs.stringify(updatedProductData)
//         );
//         console.log(updatedProductData, "tesyterssreyd");
//         setModal(false);
//         fetchData3();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const handleSubmitEditStok = async () => { 
//     console.log(editStokItem,'product_id')

//     if (!editStokItem) {
//       // Jika editStokItem adalah null (tidak ada item yang diedit)
//       const newData = [...data]; // Membuat salinan array data dengan spread operator

//       newData.forEach((item) => {
//         if (item.id === product_id) {
//           // Cek jika item yang diupdate adalah item yang sedang diubah
//           const newSisa = item.sisa - kuantitas;
//           if (newSisa < 0) {
//             toast({
//               title: 'Account created.',
//               description: "We've created your account for you.",
//               status: 'success',
//               duration: 9000,
//               isClosable: true,
//             })
//             // alert('stok kurang cuy'); 
//             // Menampilkan alert jika kuantitas yang diupdate menyebabkan sisa stok negatif
//             return; // Keluar dari fungsi untuk mencegah pengiriman request POST
//           }
//         }
//       });

//       const newStokData = {
//         product_id: product_id,
//         kuantitas: kuantitas,
//         keterangan: keterangan,
//         customer: customer,
//       };

//       try {
//         const response = await axios.post(
//           "http://localhost:3050/stok",
//           qs.stringify(newStokData)
//         );
//         console.log(product_id, kuantitas, keterangan, customer);
//         setModalEditStok(false); 
//         fetchData4();
//       } catch (error) {
//         console.error(error);
//       }

//     } else {
//       // Cek apakah kuantitas yang diupdate menyebabkan sisa stok menjadi negatif
//       const newData = [...data]; // Membuat salinan array data dengan spread operator

//       await newData.forEach((item) => {
//         console.log(item,'nitem')
//         if (item.id === editStokItem?.id) {
//           const upSisa =  item.sisa - editStokItem.kuantitas + kuantitas;
//           setNewSisa(upSisa)
//         }
//       });
      
//       console.log(newSisa, 'sisa')
//       if (newSisa < 0) {
//        toast({
//           title: 'Error',
//           description: "Stok kurang cuy",
//           status: 'error',
//           duration: 9000,
//           isClosable: true,
//         })
//       }else {
//         const updatedStokData = {
//           product_id: product_id,
//           kuantitas: kuantitas,
//           keterangan: keterangan,
//           customer: customer,
//         };
//         try {
//         const response = await axios.put(
//           `http://localhost:3050/stok/${editStokItem.id}`,
//           qs.stringify(updatedStokData)
//         );
//         console.log(updatedStokData, "tesyterssreyd");
//         setModalEditStok(false); 
//         fetchData4();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }
//   };

//   const { colorMode, toggleColorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const initialRef = React.useRef(null);
//   const finalRef = React.useRef(null);

//   return (
//     <>
//       <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
//         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//           <Flex>
//             <Image
//               src="https://febi.uinsaid.ac.id/wp-content/uploads/2020/11/pt-gudang-garam-tbk-vector-logo.png"
//               borderRadius="full"
//               boxSize="50px"
//             />
//             <Text
//               marginTop="13px"
//               marginLeft="10px"
//               fontWeight="bold"
//               fontSize="20px"
//             >
//               Data Inventori Toko
//             </Text>
//           </Flex>

//           <Flex alignItems={"center"}>
//             <Stack direction={"row"} spacing={7}>
//               <Button onClick={toggleColorMode}>
//                 {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
//               </Button>

//               <Menu>
//                 <MenuButton
//                   as={Button}
//                   rounded={"full"}
//                   variant={"link"}
//                   cursor={"pointer"}
//                   minW={0}
//                 >
//                   <Avatar
//                     size={"sm"}
//                     src={"https://avatars.dicebear.com/api/male/username.svg"}
//                   />
//                 </MenuButton>
//                 <MenuList alignItems={"center"}>
//                   <br />
//                   <Center>
//                     <Avatar
//                       size={"2xl"}
//                       src={"https://avatars.dicebear.com/api/male/username.svg"}
//                     />
//                   </Center>
//                   <br />
//                   <Center>
//                     <p>Username</p>
//                   </Center>
//                   <br />
//                   <MenuDivider />
//                   <MenuItem>Your Servers</MenuItem>
//                   <MenuItem onClick={handleSetting}>Account Settings</MenuItem>
//                   <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                 </MenuList>
//               </Menu>
//             </Stack>
//           </Flex>
//         </Flex>
//       </Box>

//       <Tabs isFitted variant="enclosed">
//         <TabList mb="1em">
//           <Tab>Data Produk</Tab>
//           <Tab>Data Stok</Tab>
//           <Tab>Persediaan</Tab>
//           <Tab>Keluar</Tab>
//           <Tab>Masuk</Tab>
//         </TabList>
//         <TabPanels>
//           <TabPanel>
//             <Flex w="full" bg="#edf3f8">
//               <Button
//                 marginTop={"30px"}
//                 marginLeft={"50px"}
//                 colorScheme="blue"
//                 onClick={() => handleAdd()}
//               >
//                 {" "}
//                 <SmallAddIcon /> Create Product
//               </Button>
//               <Modal
//                 onClose={testClick}
//                 isOpen={modal}
//                 motionPreset="slideInBottom"
//               >
//                 <ModalOverlay />
//                 <ModalContent>
//                   <ModalHeader>Add Product</ModalHeader>
//                   <ModalCloseButton />
//                   <ModalBody>
//                     <FormLabel>Name</FormLabel>
//                     <Input
//                       defaultValue={editItem?.name || ""}
//                       type="text"
//                       onChange={(e) => setName(e.target.value)}
//                     />
//                     <FormLabel>Price</FormLabel>
//                     <Input
//                       defaultValue={editItem?.price || ""}
//                       type="text"
//                       onChange={(e) => setPrice(e.target.value)}
//                     />
//                     <FormLabel>QTY</FormLabel>
//                     <Input
//                       defaultValue={editItem?.quantity || ""}
//                       type="text"
//                       onChange={(e) => setQuantity(e.target.value)}
//                     />
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button colorScheme="red" mr={3} onClick={testClick}>
//                       Close
//                     </Button>
//                     <Button colorScheme="blue" onClick={handleSubmit}>
//                       Submit
//                     </Button>
//                   </ModalFooter>
//                 </ModalContent>
//               </Modal>
//             </Flex>
//             <Flex
//               w="full"
//               bg="#edf3f8"
//               p={50}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Table w="full" bg="white" color="blue.300">
//                 <Thead>
//                   <Tr>
//                     <Th>Id</Th>
//                     <Th>Name</Th>
//                     <Th>Price</Th>
//                     <Th>Quantity</Th>
//                     <Th>Action</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data3.map((k, index) => (
//                     <Tr key={index}>
//                       <Td>{k.id}</Td>
//                       <Td>{k.name}</Td>
//                       <Td>{k.price}</Td>
//                       <Td>{k.quantity}</Td>
//                       <Td>
//                         <ButtonGroup>
//                           <Button
//                             colorScheme="green"
//                             onClick={() => handleUpdate(k)}
//                           >
//                             <EditIcon />
//                           </Button>
//                           <Button
//                             colorScheme="red"
//                             onClick={() => handleDelete(k)}
//                           >
//                             <DeleteIcon />
//                           </Button>
//                         </ButtonGroup>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Flex>
//           </TabPanel>
//           <TabPanel>
//             <Flex w="full" bg="#edf3f8">
//               <Button
//                 marginLeft={"50px"}
//                 colorScheme="blue"
//                 onClick={() => handleAddStok()}
//               >
//                 {" "}
//                 <SmallAddIcon /> Edit Stok
//               </Button>
//               <Modal
//                 onClose={() => setModalEditStok(false)}
//                 isOpen={modalEditStok}
//                 motionPreset="slideInBottom"
//               >
//                 <ModalOverlay />
//                 <ModalContent>
//                   <ModalHeader>Edit Stok</ModalHeader>
//                   <ModalCloseButton />
//                   <ModalBody>
//                     <FormLabel>Name Product</FormLabel>
//                     <Select
//                       onChange={(e) => setProductId(e.target.value)}
//                       placeholder="Select option"
//                     >
//                       {data3.map((o, index) => (
//                         <option key={`data3-${index}`} value={o.id}>
//                           {o.id} = {o.name}
//                         </option>
//                       ))}
//                     </Select>
//                     <FormLabel>Kuantitas</FormLabel>
//                     <Input
//                       defaultValue={editStokItem?.kuantitas || ""}
//                       type="text"
//                       onChange={(e) => setKuantitas(e.target.value)}
//                     />
//                     <FormLabel>Keterangan</FormLabel>
//                     <Select
//                       placeholder="Select option"
//                       onChange={(e) => setKeterangan(e.target.value)}
//                     >
//                       <option value="Masuk">Masuk</option>
//                       <option value="Keluar">Keluar</option>
//                     </Select>
//                     <FormLabel>Customer</FormLabel>
//                     <Input
//                       defaultValue={editStokItem?.customer || ""}
//                       type="text"
//                       onChange={(e) => setCustomer(e.target.value)}
//                     />
//                   </ModalBody>
//                   <ModalFooter>
//                     <Button
//                       colorScheme="red"
//                       mr={3}
//                       onClick={() => setModalEditStok(false)}
//                     >
//                       Close
//                     </Button>
//                     <Button colorScheme="blue" onClick={handleSubmitEditStok}>
//                       Submit
//                     </Button>
//                     {alert && (
//                       <Alert status="error">
//                         <AlertIcon />
//                         Stok habis cuy
//                       </Alert>
//                     )}
//                   </ModalFooter>
//                 </ModalContent>
//               </Modal>
//             </Flex>
//             <Flex
//               w="full"
//               bg="#edf3f8"
//               p={50}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Table w="full" bg="white" color="blue.300">
//                 <Thead>
//                   <Tr>
//                     <Th>Id</Th>
//                     <Th>Product_Id</Th>
//                     <Th>Kuantitas</Th>
//                     <Th>Keterangan</Th>
//                     <Th>Customer</Th>
//                     <Th>Action</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data4.map((l, index) => (
//                     <Tr key={index}>
//                       <Td>{l.id}</Td>
//                       <Td>{l.product_id}</Td>
//                       <Td>{l.kuantitas}</Td>
//                       <Td>{l.keterangan}</Td>
//                       <Td>{l.customer}</Td>
//                       <Td>
//                         <ButtonGroup>
//                           <Button
//                             colorScheme="green"
//                             onClick={() => handleUpdateStok(l)}
//                           >
//                             <EditIcon />
//                           </Button>
//                           <Button
//                             colorScheme="red"
//                             onClick={() => handleDeleteStok(l)}
//                           >
//                             <DeleteIcon />
//                           </Button>
//                         </ButtonGroup>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Flex>
//           </TabPanel>
//           <TabPanel>
//             <Flex
//               w="full"
//               bg="#edf3f8"
//               p={50}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Table w="full" bg="white" color="blue.300">
//                 <Thead>
//                   <Tr>
//                     <Th>Id</Th>
//                     <Th>Name</Th>
//                     <Th>Price</Th>
//                     <Th>Persediaan</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data.map((item, index) => (
//                     <Tr key={index}>
//                       <Td>{item.id}</Td>
//                       <Td>{item.name}</Td>
//                       <Td>{item.price}</Td>
//                       <Td>{item.sisa}</Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Flex>
//           </TabPanel>
//           <TabPanel>
//             <Flex
//               w="full"
//               bg="#edf3f8"
//               p={50}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Table w="full" bg="white" color="blue.300">
//                 <Thead>
//                   <Tr>
//                     <Th>Id</Th>
//                     <Th>Name</Th>
//                     <Th>Price</Th>
//                     <Th>QTY</Th>
//                     <Th>Customer</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data1.map((x, index) => (
//                     <Tr key={index}>
//                       <Td>{x.id}</Td>
//                       <Td>{x.name}</Td>
//                       <Td>{x.price}</Td>
//                       <Td>{x.kuantitas}</Td>
//                       <Td>{x.customer}</Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Flex>
//           </TabPanel>
//           <TabPanel>
//             <Flex
//               w="full"
//               bg="#edf3f8"
//               p={50}
//               alignItems="center"
//               justifyContent="center"
//             >
//               <Table w="full" bg="white" color="blue.300">
//                 <Thead>
//                   <Tr>
//                     <Th>Id</Th>
//                     <Th>Name</Th>
//                     <Th>Price</Th>
//                     <Th>QTY</Th>
//                     <Th>Customer</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {data2.map((y, index) => (
//                     <Tr key={index}>
//                       <Td>{y.id}</Td>
//                       <Td>{y.name}</Td>
//                       <Td>{y.price}</Td>
//                       <Td>{y.kuantitas}</Td>
//                       <Td>{y.customer}</Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </Flex>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </>
//   );
// }

// export default Navx;
