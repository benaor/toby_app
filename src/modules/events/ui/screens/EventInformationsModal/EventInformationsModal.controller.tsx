import { useCallback, useEffect, useState } from "react";

import { EventFormGeneralsInfos } from "@events/core/models/EventForm.model";
import { addGeneralsInformations } from "@events/core/usecases/addGeneralsInfos";
import { useAppDispatch } from "@store/useAppDispatch";

export const useEventInformationsModal = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] =
    useState<FormError>(initialErrorState);

  const isError = titleError || descriptionError || imageError;

  const submitGeneralInformations = () => {
    setErrorMessage(initialErrorState);

    if (isError)
      return setErrorMessage({
        title: titleError,
        description: descriptionError,
        image: imageError,
      });

    dispatch(addGeneralsInformations({ title, description, image }));
  };

  const validateTitle = useCallback(
    () => setTitleError(title.length > 2 ? null : "Le titre est trop court"),
    [title],
  );
  const validateDescription = useCallback(
    () =>
      setDescriptionError(
        description.length > 5 ? null : "La description est trop courte",
      ),
    [description],
  );
  const validateImage = useCallback(
    () => setImageError(image ? null : "Veuillez ajouter une image"),
    [image],
  );

  useEffect(validateTitle, [title]);
  useEffect(validateDescription, [description]);
  useEffect(validateImage, [image]);

  return {
    submitGeneralInformations,
    title,
    setTitle,
    description,
    setDescription,
    image,
    setImage,
    errorMessage,
  };
};

type FormError = Record<keyof EventFormGeneralsInfos, string | null>;

const initialErrorState: FormError = {
  title: "",
  description: "",
  image: "",
};
