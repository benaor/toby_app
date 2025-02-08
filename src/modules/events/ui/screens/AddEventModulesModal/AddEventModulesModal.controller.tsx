import { useToggle } from "@/src/ui/hooks/useToggle";
import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { creationActions } from "@events/core/slices/creation.slice";
import { useAppDispatch } from "@store/useAppDispatch";
import { useSelector } from "react-redux";

export const useAddEventModulesModal = () => {
  const { modules } = useSelector(creationFormSelector);
  const dispatch = useAppDispatch();

  const [location, toggleLocation] = useToggle(modules.location, () =>
    dispatch(creationActions.toggleLocationModule()),
  );
  const [budget, toggleBudget] = useToggle(modules.budget, () =>
    dispatch(creationActions.toggleBudgetModule()),
  );
  const [activity, toggleActivity] = useToggle(modules.activity, () =>
    dispatch(creationActions.toggleActivityModule()),
  );

  const [cagnotte, toggleCagnotte] = useToggle(modules.cagnotte, () =>
    dispatch(creationActions.toggleCagnotteModule()),
  );

  return {
    location,
    budget,
    activity,
    cagnotte,
    toggleLocation,
    toggleBudget,
    toggleActivity,
    toggleCagnotte,
  };
};
