import { ModalLayout } from "@components/ModalLayout";
import { useEditLocationModal } from "./EditLocationModal.controller";

export const EditLocationModal: React.FC = () => {
  const { locations } = useEditLocationModal();

  return <ModalLayout title="Modifier les lieux"></ModalLayout>;
};
