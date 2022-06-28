import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import './styles.scss';
FormTodo.propTypes = {
  onSubmit: PropTypes.func,
};

function FormTodo({ onSubmit = null }) {
  const form = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const handleSubmitTodo = (todo) => {
    if (!onSubmit) return;
    onSubmit(todo);
    form.reset();
  };
  return (
    <div className="todo__form">
      <form onSubmit={handleSubmit(handleSubmitTodo)}>
        <input {...register('name', { required: true })} placeholder="add new todo" />
        <button type="submit">add todo</button>
      </form>
    </div>
  );
}

export default FormTodo;
