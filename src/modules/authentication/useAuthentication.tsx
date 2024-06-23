export const useAuthentication = () => {
  const isConnected = false;
  const isDisconnected = !isConnected;

  return {
    isConnected,
    isDisconnected,
  };
};
