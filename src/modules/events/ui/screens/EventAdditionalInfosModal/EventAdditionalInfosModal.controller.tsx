import { useRouter } from "@app/router/useRouter";
import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useEventAdditionalInfosModal = () => {
  const router = useRouter();
  const { location, date } = useSelector(creationFormSelector);

  const [hasEndDate, setHasEndDate] = useState(false);
  const [locationName, setLocationName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [startDate, setStartDate] = useState<ISO8601 | undefined>(
    date.start ?? undefined,
  );
  const [endDate, setEndDate] = useState<ISO8601 | undefined>(
    date.end ?? undefined,
  );

  const toggleHasEndDate = () => setHasEndDate((prev) => !prev);
  const closeModal = () => router.dismiss(1);

  return {
    locationName: locationName ?? "",
    address: address ?? "",
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setLocationName,
    setAddress,
    toggleHasEndDate,
    hasEndDate,
    closeModal,
  };
};
