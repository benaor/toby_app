import { ModalLayout } from "@components/ModalLayout";
import { FC } from "react";
import { ChooseEventCard } from "../../components/ChooseEventCard";

import BirthdaySVG from "@images/birthday.svg";
import WeekendSVG from "@images/weekend.svg";
import HolidaySVG from "@images/holidays.svg";
import EvgSVG from "@images/evg.svg";
import WeedingSVG from "@images/weeding.svg";
import OnMesureSVG from "@images/on-mesure.svg";
import { View } from "react-native";
import { createStyleSheet } from "@themes/createStyleSheet";
import { useChooseEventModal } from "./ChooseEventModal.controller";

export const ChooseEventModal: FC = () => {
  const { chooseType, eventType } = useChooseEventModal();

  return (
    <ModalLayout title="Créer un événement">
      <View style={styles.container}>
        <ChooseEventCard
          title="Anniversaires"
          description="Surprise ou pas, toujours une bonne occasion !"
          ImageSVG={BirthdaySVG}
          onPress={() => chooseType("birthday")}
          selected={eventType === "birthday"}
        />
        <ChooseEventCard
          title="Week-ends"
          description="Pour un break de quelques jours."
          ImageSVG={WeekendSVG}
          onPress={() => chooseType("weekend")}
          selected={eventType === "weekend"}
        />
        <ChooseEventCard
          title="Vacances"
          description="Pour prendre du bon temps !"
          ImageSVG={HolidaySVG}
          onPress={() => chooseType("holidays")}
          selected={eventType === "holidays"}
        />
        <ChooseEventCard
          title="EVG / EVJF"
          description="Soyez un bon témoin !"
          ImageSVG={EvgSVG}
          onPress={() => chooseType("stagparty")}
          selected={eventType === "stagparty"}
        />
        <ChooseEventCard
          title="Mariages"
          description="L’occasion d’être un “Yes man” !"
          ImageSVG={WeedingSVG}
          onPress={() => chooseType("wedding")}
          selected={eventType === "wedding"}
        />
        <ChooseEventCard
          title="Sur-mesure"
          description="Partez de zéro !"
          ImageSVG={OnMesureSVG}
          onPress={() => chooseType("other")}
          selected={eventType === "other"}
        />
      </View>
    </ModalLayout>
  );
};

const styles = createStyleSheet(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },
}));
