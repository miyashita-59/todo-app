import { useState, useEffect } from 'react';
import db, { auth } from '../../firebase';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import TodoItem from './TodoItem';
import { useAuthState } from 'react-firebase-hooks/auth';

type TodoListType = {
  id: string;
  text: string;
  timestamp: any;
  userId: string;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoListType[]>([
    { id: '', text: '', timestamp: null, userId: '' },
  ]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const todos = collection(db, 'todos')
    const q = query(todos, where('userId', '==', user?.uid), orderBy('timestamp', 'asc'));
    const unSub = onSnapshot(q, async (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          userId: doc.data().userId,
        }))
      );
    });

    return () => {
      unSub();
    };
  }, [user]);

  return (
    <>
      {todos[0]?.id && (
        <>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </>
  );
};

export default TodoList;