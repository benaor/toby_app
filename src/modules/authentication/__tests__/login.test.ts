import { AuthenticatorUseCases } from "@authentication/core/useCases/Authenticator.usecase";
import {
  FailedAuthProvider,
  StubAuthProvider,
} from "@authentication/core/TestingAuthProvider.adapter";
import { AuthUserFactory } from "@authentication/AuthUser.factory";
import { Credentials } from "@authentication/core/Credentials.type";
import { InMemoryStorage } from "../../shared/storage/InMemoryStorage";
import { AuthProvider } from "@authentication/core/AuthProvider.port";
import { AuthUser } from "@authentication/core/AuthUser.type";
import { StubAlerter } from "../../shared/alerter/StubAlerter";

const credentials: Credentials = { email: "john", password: "doe" };

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Credentials are valid", async () => {
      // ARRANGE
      const { authenticator } = createSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeTruthy();
    });

    it("Storage contains authUser", async () => {
      // ARRANGE
      const { authenticator, storage, user } = createSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const storedUser = storage.get("authUser");
      expect(storedUser).toStrictEqual(user);
    });

    it("Should alert when login is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = createSut();
      const successAlert = alerter.successFn;

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      expect(successAlert).toHaveBeenCalledTimes(1);
      expect(successAlert).toHaveBeenCalledWith("You are now connected");
    });
  });

  describe("Unhappy Paths", () => {
    it("Credentials are invalid", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator } = createSut({ authProvider });

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeFalsy();
    });

    it("Should alert when credentials are incorrect", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator, alerter } = createSut({ authProvider });
      const errorAlert = alerter.errorFn;

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      expect(errorAlert).toHaveBeenCalledTimes(1);
      expect(errorAlert).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});

type SutParams = {
  authProvider?: AuthProvider;
  user?: AuthUser;
  storage?: Storage;
};

const createSut = (params?: SutParams) => {
  const storage = new InMemoryStorage();
  const user = params?.user || AuthUserFactory.create();
  const authProvider = params?.authProvider || new StubAuthProvider();
  const alerter = new StubAlerter();

  const authenticator = new AuthenticatorUseCases(
    authProvider,
    storage,
    alerter,
  );

  return { authenticator, storage, alerter, user };
};
