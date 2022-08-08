import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from 'views/Root';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import todoReducer from 'features/TodoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </Provider>,
);
