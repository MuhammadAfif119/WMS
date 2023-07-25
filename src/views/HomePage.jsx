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
import Nav1 from "./DataProduct";
import Nav2 from "./DataStok";
import Nav3 from "./Persediaan";
import Nav4 from "./Keluar";
import Nav5 from "./Masuk";

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

function Nav() {
  const [userCondition, setUserCondition] = useState(false);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  const handleSetting = () => {
    try {
      navigate("/pp");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (route) => {
    // console.log(route)
    navigate(`/${route}`);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserCondition(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const slides = [
    {
      img: "https://d2jnbxtr5v4vqu.cloudfront.net/filemanager/Maul/logo-org-importir1-2021_10_05_09_58_32.png?v=1.0",
      label: "",
      description: "Feel the freedom of shopping",
    },
    {
      img: "https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg",
      label: "",
      description: "Advice the best quality of Laptop",
    },
    {
      img: "https://c.inilah.com/2022/02/0227_105240_b27e_inilah.com_.jpeg",
      label: "",
      description: "Find your best Missile to play",
    },
    {
      img: "https://bagi-in.com/wp-content/uploads/2021/08/Sejarah-Handphone-ada-di-Indonesia-Pertama-Kali.jpg",
      label: "",
      description: "Get your best Smartphone",
    },
    {
      img: "https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-98004948/98004948.jpg",
      label: "",
      description: "Feel the fresh of nature",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  const bg = useColorModeValue("white", "gray.800");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex>
            <Image
              src="https://febi.uinsaid.ac.id/wp-content/uploads/2020/11/pt-gudang-garam-tbk-vector-logo.png"
              borderRadius="full"
              boxSize="50px"
            />
            <Text
              marginTop="13px"
              marginLeft="10px"
              fontWeight="bold"
              fontSize="20px"
            >
              Data Inventori Toko
            </Text>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://temon.kulonprogokab.go.id/files/news/normal/06a2a4d19eecc443d1066cfb759856e7.jpg"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://temon.kulonprogokab.go.id/files/news/normal/06a2a4d19eecc443d1066cfb759856e7.jpg"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem onClick={handleSetting}>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Flex
        w="full"
        bg="#edf3f8"
        _dark={{
          bg: "#3e3e3e",
        }}
        p={10}
        alignItems="center"
        justifyContent="center"
      >
        <Flex w="full" pos="relative" overflow="hidden">
          <Flex h="400px" w="full" {...carouselStyle}>
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
                <Text
                  color="black"
                  fontSize="xs"
                  p="8px 12px"
                  pos="absolute"
                  top="0"
                >
                  {sid + 1} / {slidesCount}
                </Text>
                <Image
                  src={slide.img}
                  alt="carousel image"
                  boxSize="full"
                  backgroundSize="cover"
                />
                <Stack
                  p="8px 12px"
                  pos="absolute"
                  bottom="24px"
                  textAlign="center"
                  w="full"
                  mb="8"
                  color="white"
                >
                  <Text fontSize="2xl">{slide.label}</Text>
                  <Text fontSize="lg" marginTop={"10px"}>
                    {slide.description}
                  </Text>
                </Stack>
              </Box>
            ))}
          </Flex>
          <Text {...arrowStyles} left="0" onClick={prevSlide}>
            &#10094;
          </Text>
          <Text {...arrowStyles} right="0" onClick={nextSlide}>
            &#10095;
          </Text>
          <HStack justify="center" pos="absolute" bottom="8px" w="full">
            {Array.from({
              length: slidesCount,
            }).map((_, slide) => (
              <Box
                key={`dots-${slide}`}
                cursor="pointer"
                boxSize={["7px", null, "15px"]}
                m="0 2px"
                bg={
                  currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"
                }
                rounded="50%"
                display="inline-block"
                transition="background-color 0.6s ease"
                _hover={{
                  bg: "blackAlpha.800",
                }}
                onClick={() => setSlide(slide)}
              ></Box>
            ))}
          </HStack>
        </Flex>
      </Flex>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Data Produk</Tab>
          <Tab>Data Stok</Tab>
          <Tab>Persediaan</Tab>
          <Tab>Keluar</Tab>
          <Tab>Masuk</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Nav1 />
          </TabPanel>
          <TabPanel>
            <Nav2 />
          </TabPanel>
          <TabPanel>
            <Nav3 />
          </TabPanel>
          <TabPanel>
            <Nav4 />
          </TabPanel>
          <TabPanel>
            <Nav5 />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Box pos="relative" overflow="hidden" bg={bg} mt={10}>
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{
              base: 8,
              sm: 16,
              md: 20,
              lg: 28,
              xl: 32,
            }}
            maxW={{
              lg: "2xl",
            }}
            w={{
              lg: "full",
            }}
            zIndex={1}
            bg={bg}
            border="solid 1px transparent"
          >
            <Icon
              display={{
                base: "none",
                lg: "block",
              }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={bg}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </Icon>
            <Box
              mx="auto"
              maxW={{
                base: "7xl",
              }}
              px={{
                base: 4,
                sm: 6,
                lg: 8,
              }}
              mt={{
                base: 10,
                sm: 12,
                md: 16,
                lg: 20,
                xl: 28,
              }}
            >
              <Box
                w="full"
                textAlign={{
                  sm: "center",
                  lg: "left",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{
                    base: "4xl",
                    sm: "5xl",
                    md: "6xl",
                  }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="extrabold"
                  color="gray.900"
                  _dark={{
                    color: "white",
                  }}
                >
                  <chakra.span
                    display={{
                      base: "block",
                      xl: "inline",
                    }}
                  >
                    Data to enrich your{" "}
                  </chakra.span>
                  <chakra.span
                    display={{
                      base: "block",
                      xl: "inline",
                    }}
                    color="brand.600"
                    _dark={{
                      color: "brand.400",
                    }}
                  >
                    online business
                  </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{
                    base: 3,
                    sm: 5,
                    md: 5,
                  }}
                  fontSize={{
                    sm: "lg",
                    md: "xl",
                  }}
                  maxW={{
                    sm: "xl",
                  }}
                  mx={{
                    sm: "auto",
                    lg: 0,
                  }}
                  color="gray.500"
                >
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </chakra.p>
                <Box
                  mt={{
                    base: 5,
                    sm: 8,
                  }}
                  display={{
                    sm: "flex",
                  }}
                  justifyContent={{
                    sm: "center",
                    lg: "start",
                  }}
                  fontWeight="extrabold"
                  fontFamily="fantasy"
                >
                  <Box rounded="full" shadow="md">
                    <chakra.a
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="solid 1px transparent"
                      fontSize={{
                        base: "md",
                        md: "lg",
                      }}
                      rounded="md"
                      color="white"
                      bg="brand.600"
                      _hover={{
                        bg: "brand.700",
                      }}
                      px={{
                        base: 8,
                        md: 10,
                      }}
                      py={{
                        base: 3,
                        md: 4,
                      }}
                      cursor="pointer"
                    >
                      Get started
                    </chakra.a>
                  </Box>
                  <Box mt={[3, 0]} ml={[null, 3]}>
                    <chakra.a
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      px={{
                        base: 8,
                        md: 10,
                      }}
                      py={{
                        base: 3,
                        md: 4,
                      }}
                      border="solid 1px transparent"
                      fontSize={{
                        base: "md",
                        md: "lg",
                      }}
                      rounded="md"
                      color="brand.700"
                      bg="brand.100"
                      _hover={{
                        bg: "brand.200",
                      }}
                      cursor="pointer"
                    >
                      Live demo
                    </chakra.a>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          position={{
            lg: "absolute",
          }}
          top={{
            lg: 0,
          }}
          bottom={{
            lg: 0,
          }}
          right={{
            lg: 0,
          }}
          w={{
            lg: "50%",
          }}
          border="solid 1px transparent"
        >
          <Image
            h={[56, 72, 96, "full"]}
            w="full"
            fit="cover"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt=""
            loading="lazy"
          />
        </Box>
      </Box>
      <Box
        bg="white"
        _dark={{
          bg: "gray.600",
        }}
      >
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          w="full"
          justify="space-between"
          p={10}
        >
          <Flex justify="center">
            <Image
              src="https://febi.uinsaid.ac.id/wp-content/uploads/2020/11/pt-gudang-garam-tbk-vector-logo.png"
              alt="Company Logo"
              rounded="lg"
              width={{
                base: "150px",
                lg: "200px",
              }}
              height={{
                base: "75px",
                lg: "100px",
              }}
              my={{
                base: 2,
                lg: 0,
              }}
            />
          </Flex>
          <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{
              base: "12px",
              md: "16px",
            }}
            color="gray.800"
            _dark={{
              color: "white",
            }}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            <Flex justify="start" direction="column">
              <Link textTransform="uppercase">Pre-Sale FAQS</Link>
              <Link textTransform="uppercase">Submit a ticket</Link>
            </Flex>
            <Flex justify="start" direction="column">
              <Link textTransform="uppercase">Services</Link>
              <Link textTransform="uppercase">Theme Tweak</Link>
            </Flex>
          </HStack>
          <HStack
            alignItems="start"
            flex={1}
            justify="space-around"
            fontSize={{
              base: "12px",
              md: "16px",
            }}
            color="gray.800"
            _dark={{
              color: "white",
            }}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            <Flex justify="start" direction="column">
              <Link textTransform="uppercase">Show Case</Link>
              <Link textTransform="uppercase">Widget Kit</Link>
              <Link textTransform="uppercase">Support</Link>
            </Flex>
            <Flex justify="start" direction="column">
              <Link textTransform="uppercase">About Us</Link>
              <Link textTransform="uppercase">Contact Us</Link>
              <Link textTransform="uppercase">Resources</Link>
            </Flex>
          </HStack>
        </Stack>
        <Divider
          w="95%"
          mx="auto"
          color="gray.600"
          _dark={{
            color: "#F9FAFB",
          }}
          h="3.5px"
        />
        <VStack py={3}>
          <HStack justify="center">
            <Link>
              <Icon
                color="gray.800"
                _dark={{
                  color: "white",
                }}
                h="20px"
                w="20px"
                as={FaFacebookF}
              />
            </Link>
            <Link>
              <Icon
                color="gray.800"
                _dark={{
                  color: "white",
                }}
                h="20px"
                w="20px"
                as={FiTwitter}
              />
            </Link>
            <Link>
              <Icon
                _dark={{
                  color: "white",
                }}
                h="20px"
                w="20px"
                as={GrInstagram}
              />
            </Link>
            <Link>
              <Icon
                _dark={{
                  color: "white",
                }}
                h="20px"
                w="20px"
                as={FaLinkedinIn}
              />
            </Link>
          </HStack>

          <Text
            textAlign="center"
            fontSize="smaller"
            _dark={{
              color: "white",
            }}
          >
            &copy;Copyright. All rights reserved.
          </Text>
        </VStack>
      </Box>
      ;
    </>
  );
}

export default Nav;
