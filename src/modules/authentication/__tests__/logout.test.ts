import { AuthenticatorUseCases } from "@authentication/core/useCases/Authenticator.usecase";
import {
  FailedAuthProvider,
  StubAuthProvider,
} from "@authentication/core/adapters/TestingAuthProvider.adapter";

import { InMemoryStorage } from "../../shared/storage/InMemoryStorage";
import { AuthProvider } from "@authentication/core/ports/AuthProvider.port";
import { AuthUser } from "@authentication/core/models/AuthUser.type";
import { StubAlerter } from "../../shared/alerter/StubAlerter";
import { AuthUserFactory } from "@authentication/core/models/AuthUser.factory";

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Storage should be empty", async () => {
      // ARRANGE
      const { authenticator, storage } = createSut();

      // ACT
      await authenticator.logout();

      // ASSERT
      const storedUser = storage.get("authUser");
      expect(storedUser).toBeNull();
    });

    it("Should alert when logout is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = createSut();
      const successAlert = alerter.success;

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(successAlert).toHaveBeenCalledTimes(1);
      expect(successAlert).toHaveBeenCalledWith("You are now disconnected");
    });

    it("Should call logout from authProvider", async () => {
      // ARRANGE
      const authProvider = new StubAuthProvider(AuthUserFactory.create());
      const { authenticator } = createSut({ authProvider });
      const successLogout = authProvider.logoutFn;

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(successLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe("Unhappy Paths", () => {
    it("Should alert when logout doesn't done correctly", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator, alerter } = createSut({ authProvider });
      const errorAlert = alerter.error;

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(errorAlert).toHaveBeenCalledTimes(1);
      expect(errorAlert).toHaveBeenCalledWith(
        "an error occurred while disconnecting",
      );
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
  storage.set("authUser", AuthUserFactory.create());

  const user = params?.user;
  const authProvider = params?.authProvider || new StubAuthProvider(user);
  const alerter = new StubAlerter();

  const authenticator = new AuthenticatorUseCases(
    authProvider,
    storage,
    alerter,
  );

  return { authenticator, storage, alerter, authProvider, user };
};
