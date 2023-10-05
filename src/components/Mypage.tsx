import TodoInput from "./Todo/TodoInput";
import TodoList from "./Todo/TodoList";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import React from "react";

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
        <>
          {user.email}さん
          <button onClick={logout}>ログアウト</button>
          <h1>Todoリスト</h1>
          <TodoInput />
          <TodoList />
        </>
      ) : (
        <Navigate to={`/login`} />
        )}
    </>
  );
};

export default Mypage;