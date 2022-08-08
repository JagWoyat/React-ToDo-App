import Card from 'components/Card/Card';
import React from 'react';
import AppTemplate from 'templates/AppTemplate';
import { useSelector } from 'react-redux';
import { selectTodo, getTodosStatus } from 'features/TodoSlice';

export default function Done() {
  const todos = useSelector(selectTodo);
  const todosStatus = useSelector(getTodosStatus);

  let content;
  if (todosStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (todosStatus === 'succeeded' || todosStatus === 'failed') {
    content = todos.map(
      (todo) =>
        todo.status === 'done' && (
          <Card
            _id={todo._id}
            title={todo.title}
            content={todo.content}
            status={todo.status}
            key={todo._id}
          />
        ),
    );
  }

  return <AppTemplate>{content}</AppTemplate>;
}
