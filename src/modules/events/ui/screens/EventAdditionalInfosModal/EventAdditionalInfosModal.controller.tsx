import { useCallback, useState } from "react";

export const useEventAdditionalInfosModal = () => {
  const [hasEndDate, setHasEndDate] = useState(false);

  const toggleHasEndDate = useCallback(
    () => setHasEndDate((prev) => !prev),
    [],
  );

  return {
    toggleHasEndDate,
    hasEndDate,
  };
};
