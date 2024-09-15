import {
  FailedAuthProvider,
  StubAuthProvider,
} from "@authentication/core/adapters/TestingAuthProvider.adapter";

import { AuthUserFactory } from "@authentication/core/models/AuthUser.factory";
import { createAuthenticatorSut } from "../authenticator.sut";

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Storage should be empty", async () => {
      // ARRANGE
      const { authenticator, storage } = createAuthenticatorSut();

      // ACT
      await authenticator.logout();

      // ASSERT
      const storedUser = storage.get("authUser");
      expect(storedUser).toBeNull();
    });

    it("Should alert when logout is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = createAuthenticatorSut();
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
      const { authenticator } = createAuthenticatorSut({ authProvider });
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
      const { authenticator, alerter } = createAuthenticatorSut({
        authProvider,
      });
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
