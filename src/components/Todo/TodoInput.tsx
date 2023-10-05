import { useState } from 'react';
import db, { auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const TodoInput: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [user] = useAuthState(auth);
  // TODO追加
  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText === '') return
    await addDoc(collection(db, 'todos'), {
      text: inputText,
      timestamp: serverTimestamp(),
      userId: user?.uid,
    });
    setInputText('');
  };
  return (
    <form onSubmit={onSubmitAdd} style={{ display: 'inline' }}>
      <input onChange={(e) => setInputText(e.target.value)} value={inputText} />
      <button>追加</button>
    </form>
  );
};

export default TodoInput;