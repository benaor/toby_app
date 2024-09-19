import { SessionFactory } from "@authentication/core/models/AuthUser.factory";
import { createAuthenticatorSut } from "../authenticator.sut";
import { FailedAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

describe("the user is not authenticated", () => {
  test("no session should be loaded", async () => {
    // ARRANGE
    const authProvider = new FailedAuthProvider();
    const { authenticator } = createAuthenticatorSut({ authProvider });

    // ACT
    const res = await authenticator.getSession();

    // ASSERT
    expect(res).toBeNull();
  });
});

describe("the user is authenticated", () => {
  test("Session should be loaded", async () => {
    const session = SessionFactory.SESSION({ user: { id: "123" } });

    const { authenticator } = createAuthenticatorSut({
      isLogged: true,
      session,
    });

    const res = await authenticator.getSession();

    expect(res).toEqual(session);
  });
});
