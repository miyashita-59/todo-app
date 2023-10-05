import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;