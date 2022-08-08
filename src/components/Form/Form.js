/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, addTodo, getTodosStatus, selectTodo } from 'features/TodoSlice';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

const Wrapper = styled.div`
  border: 4px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 40px 70px;
  align-content: center;
  flex-direction: column;
  right: 0;
  top: 60vh;
  height: 40vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const InputWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

export default function Form({ isVisible }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const todosStatus = useSelector(getTodosStatus);
  const todos = useSelector(selectTodo);

  return (
    <Wrapper isVisible={isVisible}>
      <h1>Add new Todo</h1>
      <InputWrapper>
        <Input
          placeholder="Title"
          maxLength={40}
          onChange={(event) => {
            setTitle(event.target.value);
            event.preventDefault();
          }}
        />
        <Input
          placeholder="Description"
          as="textarea"
          maxLength={100}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        {todosStatus === 'succeeded' && (
          <Button
            onClick={() => {
              if (title !== '') {
                dispatch(addNewTodo({ title, content }));
                Array.from(document.querySelectorAll('input')).forEach(
                  (input) => (input.value = ''),
                );
                Array.from(document.querySelectorAll('textarea')).forEach(
                  (input) => (input.value = ''),
                );
              }
            }}
          >
            New Todo
          </Button>
        )}
        {todosStatus === 'failed' && (
          <Button
            onClick={() => {
              if (title !== '') {
                dispatch(
                  addTodo({
                    _id:
                      todos.length !== 0
                        ? toString(parseInt(todos[todos.length - 1]._id, 10) + 1)
                        : '1',
                    title,
                    content,
                  }),
                );
                Array.from(document.querySelectorAll('input')).forEach(
                  (input) => (input.value = ''),
                );
                Array.from(document.querySelectorAll('textarea')).forEach(
                  (input) => (input.value = ''),
                );
              }
            }}
          >
            New Todo
          </Button>
        )}
      </InputWrapper>
    </Wrapper>
  );
}

Form.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
