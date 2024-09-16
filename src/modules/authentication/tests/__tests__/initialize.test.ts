import { SessionFactory } from "@authentication/core/models/AuthUser.factory";
import { createAuthenticatorSut } from "../authenticator.sut";

describe("the user is not authenticated", () => {
  test("no user should be loaded", async () => {
    // ARRANGE
    const { authenticator } = await createAuthenticatorSut();

    // ACT
    await authenticator.initialize();

    // ASSERT
    expect(authenticator.user).toBeUndefined();
  });
});

describe("the user is authenticated", () => {
  test("User should be loaded", async () => {
    const session = SessionFactory.SESSION({ user: { id: "123" } });

    const { authenticator } = await createAuthenticatorSut({
      isLogged: true,
      session,
    });

    await authenticator.initialize();

    expect(authenticator.user).toEqual(session.user);
  });
});
