import { Dependencies } from "@app/dependencies/Dependencies.type";
import { AppStore, createStore } from "@store/store";
import { prodDependencies } from "@app/dependencies/dependencies.prod";
import { devDependencies } from "@app/dependencies/dependencies.dev";
import { testDependencies } from "./dependencies/dependencies.test-env";

export class Main {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    switch (process.env.NODE_ENV) {
      case "production":
        return prodDependencies;

      case "test":
        return testDependencies;

      default:
      case "development":
        return devDependencies;
    }
  }
}

export const app = new Main();
