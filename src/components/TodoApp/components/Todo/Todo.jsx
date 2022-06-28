import { Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
Todo.propTypes = {
  todo: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};

function Todo({ todo = {}, onRemove = null, onEdit = null }) {
  const [ShowEdit, setShowEdit] = useState(true);

  const [status, setStatus] = useState(todo.status === 'pending' ? true : false);
  const [value, setValue] = useState(todo?.name);

  const handleRemove = (todo) => {
    if (!onRemove) return;
    onRemove(todo.id);
  };
  const handleEdit = (todo) => {
    setShowEdit(!ShowEdit);
  };
  const handleOnChange = (e) => {
    const name = e.target.value;

    setValue(name);
  };
  const handleSave = () => {
    if (!onEdit) return;
    if (value.trim() === '') return;
    const todoEdit = {
      id: todo.id,
      name: value,
      status: todo.status,
    };

    onEdit(todoEdit);
    setShowEdit(!ShowEdit);
  };
  const handleStatus = () => {
    if (!onEdit) return;
    const newStatus = !status ? 'pending' : 'new';
    const todoStatus = {
      ...todo,
      status: newStatus,
    };
    console.log(todoStatus);
    onEdit(todoStatus);
    setStatus(!status);
  };

  return (
    <li className={status ? 'active' : ''}>
      <span>
        <Checkbox
          checked={status}
          onChange={handleStatus}
          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
        />
      </span>
      <span>
        {ShowEdit ? (
          <>{todo.name}</>
        ) : (
          <input type="text" value={value} onChange={handleOnChange} />
        )}
      </span>
      {ShowEdit ? (
        <>
          <span onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
          <span onClick={() => handleRemove(todo)}>
            <i className="fa-solid fa-trash-can"></i>
          </span>
        </>
      ) : (
        <>
          <span onClick={handleSave}>
            <i className="fa-solid fa-check"></i>
          </span>
          <span onClick={() => setShowEdit(!ShowEdit)}>
            <i className="fa-solid fa-ban"></i>
          </span>
        </>
      )}
    </li>
  );
}

export default Todo;
