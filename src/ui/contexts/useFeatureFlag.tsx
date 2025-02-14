import { createContext, PropsWithChildren, useContext } from "react";

type FeatureFlagContext = {
  modules: {
    location: boolean;
    activity: boolean;
    budget: boolean;
    cagnotte: boolean;
    survey: boolean;
  };
};

const featureFlags: FeatureFlagContext = {
  modules: {
    location: false,
    activity: false,
    budget: false,
    cagnotte: false,
    survey: false,
  },
};

const featureFlagContext = createContext<FeatureFlagContext | null>(null);

export const FeatureFlagProvider = ({ children }: PropsWithChildren) => {
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
