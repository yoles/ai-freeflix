import { app } from "@src/app/main.ts";
import {DependenciesProvider} from "./DependenciesProvider.tsx";
import {RouterProvider} from "react-router-dom";
import { router } from '@src/app/react/router.tsx'
import { Provider } from "react-redux";

export const AppWrapper = () => {
  return (
    <Provider store={app.store}>
      <DependenciesProvider dependencies={app.dependencies}>
          <RouterProvider router={router} />
      </DependenciesProvider>
    </Provider>
  );
};
