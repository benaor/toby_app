import { useToggle } from "@/src/ui/hooks/useToggle";
import { useRouter } from "@app/router/useRouter";
import { screens } from "@constants/screens";
import { UserEvent } from "@events/core/models/Event.model";
import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { creationActions } from "@events/core/slices/creation.slice";
import { createEvent as createEventUsecase } from "@events/core/usecases/createEvent.usecase";
import { useAppDispatch } from "@store/useAppDispatch";
import { useSelector } from "react-redux";

export const useAddEventModulesModal = () => {
  const { modules } = useSelector(creationFormSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  const createEvent = async () => {
    try {
      const res = await dispatch(createEventUsecase());
      router.navigate(
        screens.routesWithId.eventSummary((res.payload as UserEvent).id),
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // TODO: Add errortoast
    }
  };

  return {
    location,
    budget,
    activity,
    cagnotte,
    toggleLocation,
    toggleBudget,
    toggleActivity,
    toggleCagnotte,
    createEvent,
  };
};
