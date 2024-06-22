export const useAuthentication = () => {
  const isLoggedIn = false;
  const isDisconnected = !isLoggedIn;

  return {
    isLoggedIn,
    isDisconnected,
  };
};
