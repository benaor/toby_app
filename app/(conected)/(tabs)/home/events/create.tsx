import { ChooseEventCard } from "@/src/modules/events/ui/components/ChooseEventCard";
import { ModalLayout } from "@components/ModalLayout";
import { createStyleSheet } from "@themes/createStyleSheet";
import { View } from "react-native";

import BirthdaySVG from "@images/birthday.svg";
import WeekendSVG from "@images/weekend.svg";
import HolidaySVG from "@images/holidays.svg";
import EvgSVG from "@images/evg.svg";
import WeedingSVG from "@images/weeding.svg";
import OnMesureSVG from "@images/on-mesure.svg";

export default function createEventModal() {
  return (
    <ModalLayout title="Créer un événement">
      <View style={styles.container}>
        <ChooseEventCard
          title="Anniversaires"
          description="Surprise ou pas, toujours une bonne occasion !"
          ImageSVG={BirthdaySVG}
        />
        <ChooseEventCard
          title="Week-ends"
          description="Pour un break de quelques jours."
          ImageSVG={WeekendSVG}
        />
        <ChooseEventCard
          title="Vacances"
          description="Pour prendre du bon temps !"
          ImageSVG={HolidaySVG}
        />
        <ChooseEventCard
          title="EVG / EVJF"
          description="Soyez un bon témoin !"
          ImageSVG={EvgSVG}
        />
        <ChooseEventCard
          title="Mariages"
          description="L’occasion d’être un “Yes man” !"
          ImageSVG={WeedingSVG}
        />
        <ChooseEventCard
          title="Sur-mesure"
          description="Partez de zéro !"
          ImageSVG={OnMesureSVG}
        />
      </View>
    </ModalLayout>
  );
}

const styles = createStyleSheet((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },
}));
