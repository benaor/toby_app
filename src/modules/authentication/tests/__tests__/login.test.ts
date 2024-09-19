import { FailedAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

import { Credentials } from "@authentication/core/models/Credentials.type";
import { createAuthenticatorSut } from "../authenticator.sut";
import { Session } from "@authentication/core/models/AuthUser.type";

const credentials: Credentials = { email: "john", password: "doe" };

describe("Login", () => {
  describe("Happy Paths", () => {
    it("Credentials are valid", async () => {
      // ARRANGE
      const { authenticator } = createAuthenticatorSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeTruthy();
    });

    it("Storage contains session's tokens", async () => {
      // ARRANGE
      const { authenticator, typedStorage, session } = createAuthenticatorSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const storedSession = typedStorage.get<Session>("session");
      expect(storedSession?.accessToken).toStrictEqual(session.accessToken);
      expect(storedSession?.refreshToken).toStrictEqual(session.refreshToken);
    });

    it("Storage contains session user's infos", async () => {
      // ARRANGE
      const { authenticator, typedStorage, session } = createAuthenticatorSut();

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const storedSession = typedStorage.get<Session>("session");
      expect(storedSession?.user).toStrictEqual(session.user);
    });

    it("Should alert when login is done correctly", async () => {
      // ARRANGE
      const { authenticator, alerter } = createAuthenticatorSut();
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
      const { authenticator } = createAuthenticatorSut({ authProvider });

      // ACT
      await authenticator.login(credentials);

      // ASSERT
      const isConnected = authenticator.isConnected();
      expect(isConnected).toBeFalsy();
    });

    it("Should alert when credentials are incorrect", async () => {
      // ARRANGE
      const authProvider = new FailedAuthProvider();
      const { authenticator, alerter } = createAuthenticatorSut({
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
