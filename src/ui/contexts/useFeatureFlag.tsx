import { createContext, useContext } from "react";

type FeatureFlagContext = {
  locationModule: boolean;
};

const featureFlags = {
  locationModule: true,
};

const featureFlagContext = createContext<FeatureFlagContext | null>(null);

export const FeatureFlagProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <featureFlagContext.Provider value={featureFlags}>
      {children}
    </featureFlagContext.Provider>
  );
};

export const useFeatureFlag = () => {
  const context = useContext(featureFlagContext);

  if (!context)
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider");

  return context;
};
