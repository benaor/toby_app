export const useAuthentication = () => {
  const isConnected = true;
  const isDisconnected = !isConnected;

  return {
    isConnected,
    isDisconnected,
  };
};
