import { User, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

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
        <h1>ログインページ</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input
              name="email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button onClick={signUp}>新規登録はこちら</button>
          <button type="submit">ログイン</button>
        </form>
      </>
      )}
    </>
  );
};

export default Login;