import { createStore, RootState } from "@src/core/store";
import { Dependencies } from "@src/app/dependencies";

const createDependencies = (
  dependencies?: Partial<Dependencies>
): Dependencies => ({
  ...dependencies,
});


export const createTestStore = (config?: {
  initialState?: Partial<RootState>;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialStore = createStore({
    dependencies: createDependencies(config?.dependencies),
  });

  const initialState = {
    ...initialStore.getState(),
    ...config?.initialState,
  };

  const store = createStore({
    initialState,
    dependencies: createDependencies(config?.dependencies),
  });

  return store;
};


export const createTestState = (partialState?: Partial<RootState>) => {
  const store = createStore({
    dependencies: createDependencies(),
  });

  const storeInitialState = store.getState();

  const merged = {
    ...storeInitialState,
    ...partialState,
  };

  return createTestStore({ initialState: merged }).getState();
};
