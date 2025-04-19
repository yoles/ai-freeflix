import {Dependencies} from "@src/app/dependencies.ts";
import { AppStore } from "@src/core/store";
import { createStore } from "@src/core/store";
import { HttpAdapter } from "@src/core/adapters";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      httpClient: new HttpAdapter()
    };
  }
}

export const app = new App();
