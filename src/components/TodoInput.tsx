import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';

const TodoInput: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const toast = useToast();

  // TODO追加
  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText === '') {
        return toast({
            description: "入力してください",
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }
    await addDoc(collection(db, 'todos'), {
      text: inputText,
      timestamp: serverTimestamp(),
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