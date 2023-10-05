import { useState, useEffect, useRef } from 'react';
import db from '../../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

type TodoItemType = {
  todo: { id: string; text: string; timestamp: any; userId: string; };
};

const TodoItem: React.FC<TodoItemType> = (props) => {
  const { id, text, timestamp, userId } = props.todo;

  const [update, setUpdate] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const updateInput = useRef<HTMLInputElement>(null);
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    // 選択したアイテムにフォーカスを当てる
    const refInput = updateInput.current;
    if (isEdit === true) {
      if (refInput === null) return;
      refInput?.focus();
    }
  }, [isEdit]);

  const onSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem(id);
  };
  const updateItem = async (id: string) => {
    if (update === '') return;
    await updateDoc(doc(db, 'todos', id), {
      text: update,
    });
    setIsEdit(false);
  };
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <li className="todo-item">
      {isEdit === false ? (
        <div onDoubleClick={() => setIsEdit(true)}>
          <span>{text}</span>
          <span className="date-text">
            {new Date(timestamp?.toDate()).toLocaleString()}
            {userId}
          </span>
        </div>
      ) : (
        <div>
          <form onSubmit={onSubmitUpdate}>
            <input
              type="text"
              className="update-input"
              placeholder={text}
              ref={updateInput}
              onChange={(e) => setUpdate(e.target.value)}
            />
            <button className="updateBtn" onClick={() => updateItem(id)}>
              更新
            </button>
          </form>
        </div>
      )}

      <button className="deleteBtn" onClick={onOpen}>
        削除
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay sx={{background:'rgba(123,123,123,0.5);',}} />
        <ModalContent sx={{w:'300px', background: 'white', borderRadius: '10px', p:'10px', m: 'auto'}}>
          <ModalHeader>このTodoを削除しますか？</ModalHeader>
          <ModalBody>
            todo内容：{text}
          </ModalBody>
          <ModalFooter>
            <button className="deleteBtn" onClick={() => deleteItem(id)}>
              削除
            </button>
            <button className="deleteBtn" onClick={onClose}>
              いいえ
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </li>
  );
};

export default TodoItem;