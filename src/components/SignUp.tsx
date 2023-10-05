import React, { useEffect, useState } from "react";
import { auth } from '../firebase';
import { User, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Button, Card, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
const SignUp: React.FC  = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      if (!email || !password) return alert("メールアドレス、パスワードを正しく入力してください");
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        return alert('登録に失敗しました。');
      }
    };
    const handleChangeEmail = (event: any) => {
      setEmail(event.currentTarget.value);
    };
    const handleChangePassword = (event: any) => {
      setPassword(event.currentTarget.value);
    };

    const login = async () => {
      navigate("/login/");
    }

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    }, []);
  
    return (
      <Box>
        {user ? (
          <Navigate to={`/`} />
        ) : (
        <>
        <Heading bg={'#f7ecfc'} color={'rgb(156, 30, 210)'}>ユーザ登録</Heading>
        <form onSubmit={handleSubmit}>
          <Box>
            <label>メールアドレス</label>
            <Input
              name="email"
              type="email"
              placeholder="email"
              onChange={(event) => handleChangeEmail(event)}
            />
          </Box>
          <Box>
            <label>パスワード</label>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={(event) => handleChangePassword(event)}
            />
          </Box>
          <Box textAlign={'end'}>
            <Button type="submit">登録</Button>
          </Box>
        </form>
        </>
        )}
      </Box>
    );
  };
  
  export default SignUp;