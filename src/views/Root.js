import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, getTodosStatus } from 'features/TodoSlice';

import Deleted from './Deleted';
import Done from './Done';
import Todo from './Todo';

export default function Root() {
  const dispatch = useDispatch();
  const todosStatus = useSelector(getTodosStatus);

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todo" />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/done" element={<Done />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
    </BrowserRouter>
  );
}
