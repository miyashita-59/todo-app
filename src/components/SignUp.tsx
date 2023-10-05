import React, { useEffect, useState } from "react";
import { auth } from '../firebase';
import { User, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
const SignUp: React.FC  = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
      event.preventDefault();
      if (!email || !password) return alert("メールアドレス、パスワードを正しく入力してください");
      createUserWithEmailAndPassword(auth, email, password);
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
      <div>
        {user ? (
          <Navigate to={`/`} />
        ) : (
        <>
        <h1>ユーザ登録</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input
                name="email"
                type="email"
                placeholder="email"
                onChange={(event) => handleChangeEmail(event)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={(event) => handleChangePassword(event)}
             />
          </div>
          <div>
            <button onClick={login}>ログインはこちら</button>
            <button type="submit">登録</button>
          </div>
        </form>
        </>
        )}
      </div>
    );
  };
  
  export default SignUp;