import { FailedAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

import { createAuthenticatorSut } from "../authenticator.sut";
import { Session } from "@authentication/core/models/AuthUser.type";

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Storage should be empty", async () => {
      // ARRANGE
      const { authenticator, typedStorage } = await createAuthenticatorSut();

      // ACT
      await authenticator.logout();

      // ASSERT
      const storedUser = await typedStorage.get<Session>("session");
      expect(storedUser).toBeNull();
    });

    it("Should alert when logout is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = await createAuthenticatorSut();
      const successAlert = alerter.success;

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(successAlert).toHaveBeenCalledTimes(1);
      expect(successAlert).toHaveBeenCalledWith("You are now disconnected");
    });

    it("Should call logout from authProvider", async () => {
      // ARRANGE
      const { authenticator, authProvider } = await createAuthenticatorSut();

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(authProvider.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe("Unhappy Paths", () => {
    it("Should alert when logout doesn't done correctly", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator, alerter } = await createAuthenticatorSut({
        authProvider,
      });

      // ACT
      await authenticator.logout();

      // ASSERT
      expect(alerter.error).toHaveBeenCalledTimes(1);
      expect(alerter.error).toHaveBeenCalledWith(
        "an error occurred while disconnecting",
      );
    });
  });
});
