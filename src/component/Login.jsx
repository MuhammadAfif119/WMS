import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SplitScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignUp = async () => {
    try {
      navigate("/sign-up");
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(errorMessage);
    }
  };

  const handleSignIn = async () => {
    try {
      setAuthenticated(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      navigate("/");
      console.log(user, "user");
      // alert("Berhasil MASUK");

      // const userData = {
      //   email: user.email,
      // };
    } catch (error) {
      throw error;
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert(errorMessage);
      // console.log(errorMessage);
    }

    console.log(email, "email");
    console.log(password, "password");
    console.log("masuk joss");
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"} onClick={handleSignUp}>
                Sign Up?
              </Link>
            </Stack>

            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={() => handleSignIn()}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
