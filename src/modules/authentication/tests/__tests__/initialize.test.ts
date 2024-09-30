import { SessionFactory } from "@authentication/core/models/Session.factory";
import { createAuthenticatorSut } from "../authenticator.sut";
import { FailedAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";

describe("the user is not authenticated", () => {
  test("no session should be loaded", async () => {
    // ARRANGE
    const authProvider = new FailedAuthProvider();
    const { authenticator } = await createAuthenticatorSut({ authProvider });

    // ACT
    const res = await authenticator.initialize();

    // ASSERT
    expect(res).toBeNull();
  });
});

describe("the user is authenticated", () => {
  test("Session should be loaded", async () => {
    const session = SessionFactory.SESSION({ user: { id: "123" } });

    const { authenticator } = await createAuthenticatorSut({
      isLogged: true,
      session,
    });

    const res = await authenticator.initialize();

    expect(res).toEqual(session);
  });
});
