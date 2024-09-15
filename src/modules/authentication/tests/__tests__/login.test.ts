import { FailedAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

import { Credentials } from "@authentication/core/models/Credentials.type";
import { createAuthenticatorSut } from "../authenticator.sut";

const credentials: Credentials = { email: "john", password: "doe" };

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Credentials are valid", async () => {
      // ARRANGE
      const { authenticator } = await createAuthenticatorSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeTruthy();
    });

    it("Storage contains authUser", async () => {
      // ARRANGE
      const { authenticator, storage, user } = await createAuthenticatorSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const storedUser = await storage.get("authUser");
      expect(storedUser).toStrictEqual(user);
    });

    it("Should alert when login is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = await createAuthenticatorSut();
      const successAlert = alerter.success;

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
      const { authenticator } = await createAuthenticatorSut({ authProvider });

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeFalsy();
    });

    it("Should alert when credentials are incorrect", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator, alerter } = await createAuthenticatorSut({
        authProvider,
      });
      const errorAlert = alerter.error;

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      expect(errorAlert).toHaveBeenCalledTimes(1);
      expect(errorAlert).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
