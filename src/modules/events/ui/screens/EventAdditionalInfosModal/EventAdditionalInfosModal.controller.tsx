import { useRouter } from "@app/router/useRouter";
import { EventFormAdditionalsInfos } from "@events/core/models/EventForm.model";
import { creationFormSelector } from "@events/core/selectors/creation.selector";
import { addAdditionalsInfos } from "@events/core/usecases/additionalsInfos";
import { useAppDispatch } from "@store/useAppDispatch";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { goBackToPreviousStep } from "@events/core/usecases/goBackToPreviousStep";

export const useEventAdditionalInfosModal = () => {
  const router = useRouter();
  const { location, date } = useSelector(creationFormSelector);
  const dispatch = useAppDispatch();

  const [hasEndDate, setHasEndDate] = useState(false);

  const [name, setName] = useState(location.name);
  const [address, setAddress] = useState(location.address);
  const [startDate, setStartDate] = useState<ISO8601 | undefined>(
    date.start ?? undefined,
  );
  const [endDate, setEndDate] = useState<ISO8601 | undefined>(
    date.end ?? undefined,
  );

  const [nameError, setNameError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState<FormError<EventFormAdditionalsInfos>>(initialErrorState);

  const isError = nameError || addressError || startDateError || endDateError;

  const toggleHasEndDate = () => setHasEndDate((prev) => !prev);
  const closeModal = () => router.dismiss(1);

  const validateName = useCallback(
    () =>
      setNameError(
        name && name.length >= 2
          ? null
          : "Le nom du lieu doit contenir au moins 2 caractères",
      ),
    [name],
  );

  const validateAddress = useCallback(
    () =>
      setAddressError(
        address && address.length >= 5
          ? null
          : "L'adresse doit contenir au moins 5 caractères",
      ),
    [address],
  );

  const validateStartDate = useCallback(() => {
    setStartDateError(startDate ? null : "La date de début est requise");

    if (!hasEndDate) return;

    setEndDateError(
      startDate && endDate && startDate < endDate
        ? null
        : "La date de fin doit être après la date de début",
    );
  }, [startDate]);

  const validateEndDate = useCallback(() => {
    if (!hasEndDate) return setEndDateError(null);
    setEndDateError(
      endDate && startDate && endDate > startDate
        ? null
        : "La date de fin doit être après la date de début",
    );
  }, [endDate]);

  const setAdditionalsInfos = async () => {
    setErrorMessage(initialErrorState);

    if (isError)
      setErrorMessage({
        location: {
          name: nameError,
          address: addressError,
        },
        date: {
          start: startDateError,
          end: endDateError,
        },
      });

    const form: DeepNullable<EventFormAdditionalsInfos> = {
      date: {
        start: startDate || null,
        end: hasEndDate && endDate ? endDate : null,
      },
      location: {
        name: name || null,
        address: address || null,
      },
    };

    if (!isFormValid(form) || isError) return;

    dispatch(addAdditionalsInfos(form));
  };

  const goToPreviousStep = () => {
    dispatch(goBackToPreviousStep());
  };

  useEffect(validateName, [name]);
  useEffect(validateAddress, [address]);
  useEffect(validateStartDate, [startDate]);
  useEffect(validateEndDate, [endDate]);

  return {
    name: name ?? "",
    address: address ?? "",
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setName,
    setAddress,
    toggleHasEndDate,
    hasEndDate,
    closeModal,
    setAdditionalsInfos,
    errorMessage,
    goToPreviousStep,
  };
};

const initialErrorState: FormError<EventFormAdditionalsInfos> = {
  location: {
    name: "",
    address: "",
  },
  date: {
    start: "",
    end: "",
  },
};

const isFormValid = (
  form: DeepNullable<EventFormAdditionalsInfos>,
): form is EventFormAdditionalsInfos => {
  return (
    form.location.name !== null &&
    form.location.name?.length >= 2 &&
    form.location.address !== null &&
    form.location.address?.length >= 5 &&
    form.date.start !== null
  );
};
