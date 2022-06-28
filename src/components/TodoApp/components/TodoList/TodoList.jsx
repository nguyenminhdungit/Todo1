import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './styles.scss';

TodoList.propTypes = {
  todos: PropTypes.array,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

function TodoList({ todos = [], onEdit = null, onRemove = null }) {
  const handleRemove = (todo) => {
    if (!onRemove) return;
    onRemove(todo);
  };
  const handleEdit = (todo) => {
    if (!onEdit) return;
    onEdit(todo);
  };
  return (
    <ul className="todo__list">
      {todos.length === 0 ? (
        <h2>Not thing</h2>
      ) : (
        <>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} onEdit={handleEdit} onRemove={handleRemove} />
          ))}
        </>
      )}
    </ul>
  );
}

export default TodoList;
