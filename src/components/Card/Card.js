import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from 'components/Header/Header';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  getTodosStatus,
  removeThunkTodo,
  removeTodo,
  restoreTodo,
  updateThunkTodo,
  updateTodo,
} from 'features/TodoSlice';

const Wrapper = styled.div`
  width: 800px;
  height: 200px;
  margin: 20px;
  padding: 10px;
  border: 1px solid;
  box-shadow: 5px 10px 10px #888888;
  display: grid;
  grid-template-rows: 0.1fr 1fr;
`;

const HeaderWrapper = styled.div`
  border: none;
  margin-bottom: 15px;
  margin-top: 0px;
`;

const Buttons = styled.div`
  text-align: right;
`;

export default function Card({ _id, title, content, status }) {
  const dispatch = useDispatch();

  const todosStatus = useSelector(getTodosStatus);

  let buttons;
  if (todosStatus === 'succeeded') {
    if (status === 'todo') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateThunkTodo({
                  _id,
                  status: 'done',
                }),
              )
            }
          >
            Done
          </Button>
          <Button
            secondary
            onClick={() => {
              dispatch(
                updateThunkTodo({
                  _id,
                  status: 'deleted',
                }),
              );
            }}
          >
            Delete
          </Button>
        </>
      );
    }

    if (status === 'done') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateThunkTodo({
                  _id,
                  status: 'todo',
                }),
              )
            }
          >
            Todo
          </Button>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateThunkTodo({
                  _id,
                  status: 'deleted',
                }),
              )
            }
          >
            Delete
          </Button>
        </>
      );
    }
    if (status === 'deleted') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateThunkTodo({
                  _id,
                  status: 'todo',
                }),
              )
            }
          >
            Restore
          </Button>
          <Button
            secondary
            onClick={() =>
              dispatch(
                removeThunkTodo({
                  _id,
                }),
              )
            }
          >
            Remove
          </Button>
        </>
      );
    }
  } else if (todosStatus === 'failed') {
    if (status === 'todo') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateTodo({
                  _id,
                }),
              )
            }
          >
            Done
          </Button>
          <Button
            secondary
            onClick={() => {
              dispatch(
                deleteTodo({
                  _id,
                }),
              );
            }}
          >
            Delete
          </Button>
        </>
      );
    }

    if (status === 'done') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                updateTodo({
                  _id,
                }),
              )
            }
          >
            Todo
          </Button>
          <Button
            secondary
            onClick={() =>
              dispatch(
                deleteTodo({
                  _id,
                }),
              )
            }
          >
            Delete
          </Button>
        </>
      );
    }
    if (status === 'deleted') {
      buttons = (
        <>
          <Button
            secondary
            onClick={() =>
              dispatch(
                restoreTodo({
                  _id,
                }),
              )
            }
          >
            Restore
          </Button>
          <Button
            secondary
            onClick={() =>
              dispatch(
                removeTodo({
                  _id,
                }),
              )
            }
          >
            Remove
          </Button>
        </>
      );
    }
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>{title}</Header>
      </HeaderWrapper>
      <Paragraph>{content}</Paragraph>
      <Buttons>{buttons}</Buttons>
    </Wrapper>
  );
}

Card.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  status: PropTypes.oneOf(['todo', 'done', 'deleted']).isRequired,
};

Card.defaultProps = {
  content: 'Todo',
};
