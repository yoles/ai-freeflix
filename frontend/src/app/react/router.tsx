import { createBrowserRouter } from 'react-router-dom';
import RootApp from '@features/root/react/RootApp';
import Home from '@shared/components/Home';

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