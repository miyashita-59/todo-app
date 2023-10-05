import { User, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Heading, Input } from "@chakra-ui/react";

const Login: React.FC  = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const signUp = async () => {
    navigate("/signup/");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });


  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
      <>
        <Heading bg={'#f7ecfc'} color={'rgb(156, 30, 210)'}>ログインページ</Heading>
        <form onSubmit={handleSubmit}>
          <Box>
            <label>メールアドレス</label>
            <Input
              name="email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </Box>
          <Box>
            <label>パスワード</label>
            <Input
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Box>
          <Box textAlign={'end'}>
          <Button type="submit">ログイン</Button>
          </Box>
        </form>
        <Button onClick={signUp}>新規登録はこちら</Button>
      </>
      )}
    </>
  );
};

export default Login;