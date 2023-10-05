import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import React from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const Mypage: React.FC  = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }
  return (
    <>
      {user ? (
        <Box>
          <Box h='50px'>
            <Flex justify={'end'} align={'center'} gap={5}>
              {user.email}さん
              <Button onClick={logout}>ログアウト</Button>
            </Flex>
          </Box>
          <Heading bg={'#f7ecfc'} color={'rgb(156, 30, 210)'}>Todoリスト</Heading>
          <TodoInput />
          <TodoList />
        </Box>
      ) : (
        <Navigate to={`/login`} />
        )}
    </>
  );
};

export default Mypage;