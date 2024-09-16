import { createAuthenticatorSut } from "../authenticator.sut";

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
