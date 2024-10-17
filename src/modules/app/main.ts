import { Dependencies } from "@app/dependencies/Dependencies.type";
import { AppStore, createStore } from "@store/store";

export class Main {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    let importPath;
    let dependencies: Dependencies;

    switch (process.env.NODE_ENV) {
      case "production":
        importPath = require("@app/dependencies/dependencies.prod");
        dependencies = importPath.prodDependencies;
        break;

      case "test":
        importPath = require("@app/dependencies/dependencies.test-env");
        dependencies = importPath.testDependencies;
        break;

      default:
      case "development":
        importPath = require("@app/dependencies/dependencies.dev");
        dependencies = importPath.devDependencies;
        break;
    }

    return dependencies;
  }
}

export const app = new Main();
