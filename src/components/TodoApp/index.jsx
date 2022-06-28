import { useEffect, useState } from 'react';
import FormTodo from './components/FormTodo/FormTodo';
import TodoList from './components/TodoList/TodoList';
import './styles.scss';
TodoApp.propTypes = {};

function TodoApp() {
  const [todos, setTodo] = useState(() => {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleSubmit = ({ name, id, status }) => {
    const newTodo = id
      ? {
          id,
          name,
          status,
        }
      : {
          id: Math.trunc(Math.random() * 1000),
          name: name,
          status: 'new',
        };

    const index = todos.findIndex((item) => item.id === newTodo.id);
    if (index >= 0) {
      const newArr = [...todos];
      newArr[index] = newTodo;
      setTodo(newArr);
    } else {
      const newArr = [...todos, newTodo];
      setTodo(newArr);
    }
  };

  const handleRemove = (todoId) => {
    // console.log(todoId);
    const newArr = todos.filter((todo) => todo.id !== todoId);
    setTodo(newArr);
  };
  return (
    <div className="todo">
      <h2>TODO APP</h2>
      <div className="todo__box">
        <FormTodo onSubmit={handleSubmit} />
        <TodoList todos={todos} onEdit={handleSubmit} onRemove={handleRemove} />
      </div>
    </div>
  );
}

export default TodoApp;
