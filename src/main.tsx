import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // Дочерние маршруты можно добавить здесь:
    children: [
      // { path: 'about', element: < /> },
    ],
  },
]);

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// 2. Рендерим приложение
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
