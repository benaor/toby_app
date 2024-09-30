import {
  FailedAuthProvider,
  StubAuthProvider,
} from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { createAuthenticatorSut } from "../authenticator.sut";
import { SessionUser } from "@authentication/core/models/AuthUser.type";
import { SessionFactory } from "@authentication/core/models/Session.factory";

describe("Register", () => {
  it("Should return the user when user is created", async () => {
    // ARRANGE
    const userForm = SessionFactory.USER_FORM({
      firstName: "John",
      lastName: "Doe",
      email: "register@test.dev",
    });

    const user = SessionFactory.SESSION_USER({ id: "123" });
    const session = SessionFactory.SESSION({ user });
    const authProvider = new StubAuthProvider(session);
    const { authenticator } = await createAuthenticatorSut({
      authProvider,
    });

    // ACT
    const res = await authenticator.register(userForm);

    // ASSERT
    expect(res.user).toEqual({
      ...userForm,
      id: "123",
    } satisfies SessionUser);
  });

  describe("UnHappy Path", () => {
    it("Should return error as string when user is not created", async () => {
      // ARRANGE
      const userForm = SessionFactory.USER_FORM({ firstName: "Benjamin" });
      const authProvider = new FailedAuthProvider();
      const { authenticator } = await createAuthenticatorSut({
        authProvider,
      });

      // ACT
      const res = await authenticator.register(userForm);

      // ASSERT
      expect(res?.error).toBe("Failed to create user");
    });
  });
});
