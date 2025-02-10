import { Guest } from "@events/core/models/Guest.model";
import {
  creationFormSelector,
  creationSearchGuestsSelector,
} from "@events/core/selectors/creation.selector";
import { creationActions } from "@events/core/slices/creation.slice";
import { useAppDispatch } from "@store/useAppDispatch";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { goBackToPreviousStep } from "@events/core/usecases/goBackToPreviousStep";

export const useAddGuestsToEventModal = () => {
  const dispatch = useAppDispatch();

  const { guests: guestsForm } = useSelector(creationFormSelector);
  const {
    guests: guestsProposition,
    field: searchField,
    error: searchError,
  } = useSelector(creationSearchGuestsSelector);

  const removeGuest = useCallback(
    (id: Identifier) => {
      dispatch(creationActions.removeGuestfromForm(id));
    },
    [guestsForm],
  );

  const addGuest = useCallback(
    (guest: Guest) => {
      dispatch(creationActions.addGuestToForm(guest));
    },
    [guestsForm, guestsProposition],
  );

  const setSearchField = useCallback(
    (field: string) => {
      dispatch(creationActions.setSearchField(field));
    },
    [dispatch],
  );

  const isInvited = useCallback(
    (id: Identifier) => {
      return guestsForm.some((guest) => guest.id === id);
    },
    [guestsForm],
  );

  const validateGuestsStep = useCallback(() => {
    dispatch(creationActions.validateGuestsStep());
  }, [dispatch]);

  const goToPreviousStep = () => {
    dispatch(goBackToPreviousStep());
  };

  return {
    guests: guestsForm,
    guestsProposition,
    removeGuest,
    addGuest,
    searchField,
    setSearchField,
    isInvited,
    searchError,
    validateGuestsStep,
    goToPreviousStep,
  };
};
