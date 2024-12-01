import { creationStepSelector } from "@events/core/selectors/creation.selector";
import { useSelector } from "react-redux";

export const useCreateEventWorkflow = () => {
  const step = useSelector(creationStepSelector);

  return {
    step,
  };
};
