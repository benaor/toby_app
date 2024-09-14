export const useAuthentication = () => {
  const isConnected = true;
  const isDisconnected = !isConnected;

  const signInWithEmail = () => {};

  return {
    isConnected,
    isDisconnected,
    signInWithEmail,
  };
};
