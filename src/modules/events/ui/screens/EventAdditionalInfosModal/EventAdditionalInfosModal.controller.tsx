import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useEventAdditionalInfosModal = () => {
  const { location } = useSelector(creationFormSelector);

  const [hasEndDate, setHasEndDate] = useState(false);
  const [locationName, setLocationName] = useState(location.name);
  const [address, setAddress] = useState(location.address);

  const toggleHasEndDate = () => setHasEndDate((prev) => !prev);

  return {
    locationName: locationName ?? "",
    address: address ?? "",
    setLocationName,
    setAddress,
    toggleHasEndDate,
    hasEndDate,
  };
};
