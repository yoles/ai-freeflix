import { createBrowserRouter } from 'react-router-dom';
import RootApp from '@src/features/root/react/pages/RootApp';
import Home from '@src/features/movies/react/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootApp />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);