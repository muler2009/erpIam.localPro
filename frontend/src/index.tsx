import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/assets/css/index.css";
import { RouterProvider } from 'react-router-dom';
import Router from './Router/Router';
import { Provider } from 'react-redux';
import store from '../src/store/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={Router()} />
  </Provider>
);

