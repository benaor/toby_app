import { createContext, PropsWithChildren, useContext } from "react";

type FeatureFlagContext = {
  modules: {
    location: boolean;
    activity: boolean;
    budget: boolean;
    cagnotte: boolean;
    survey: boolean;
  };
  events: {
    importantMessage: boolean;
    notes: boolean;
    location: boolean;
    gallery: boolean;
  };
  features: {
    sendReminder: boolean;
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
  events: {
    importantMessage: false,
    notes: false,
    location: false,
    gallery: false,
  },
  features: {
    sendReminder: false,
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
