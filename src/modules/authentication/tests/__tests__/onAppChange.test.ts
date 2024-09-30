import { Session } from "@authentication/core/models/AuthUser.type";
import { createAuthenticatorSut } from "../authenticator.sut";
import { StubAuthProvider } from "@authentication/core/adapters/TestingAuthProvider.adapter";
import { SessionFactory } from "@authentication/core/models/Session.factory";

describe("On app change", () => {
  it("Should start auto refresh", async () => {
    // ARRANGE
    const { authenticator, authProvider } = await createAuthenticatorSut();

    // ACT
    authenticator.startAutoRefresh();

    // ASSERT
    expect(authProvider.startAutoRefresh).toHaveBeenCalledTimes(1);
  });

  it("Should stop auto refresh", async () => {
    // ARRANGE
    const { authenticator, authProvider } = await createAuthenticatorSut();

    // ACT
    authenticator.stopAutoRefresh();

    // ASSERT
    expect(authProvider.stopAutoRefresh).toHaveBeenCalledTimes(1);
  });
});

describe("On Session change", () => {
  it("Should start auto refresh", async () => {
    // ARRANGE
    const sessionBefore = SessionFactory.SESSION();
    const sessionAfter = SessionFactory.SESSION({ user: { id: "newId" } });
    const authProvider = new StubAuthProvider(sessionBefore);
    const { authenticator } = await createAuthenticatorSut({ authProvider });
    const firstSession = await authProvider.getSession();

    // ACT
    let newSession: Session | null = null;
    authenticator.onSessionChange((_session) => {
      newSession = _session;
    });

    authProvider.session.set(sessionAfter);

    // ASSERT
    expect(firstSession).toEqual(sessionBefore);
    expect(newSession).toEqual(sessionAfter);
  });
});
