import {Dependencies} from "@src/app/dependencies.ts";
import { AppStore } from "@src/core/store";
import { createStore } from "@src/core/store";

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {};
  }
}

export const app = new App();
