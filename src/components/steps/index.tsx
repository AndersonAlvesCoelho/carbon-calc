"use client";

import { useStepContext } from "@/context/stepContext";
import EatingHabitsStep from "./EatingHabits";
import ElectricityStep from "./Electricity";
import EndStep from "./End";
import StartStep from "./Start";
import TransportStep from "./Transport";

export default function Steps() {
  const { breadcrumbs } = useStepContext();

  switch (breadcrumbs) {
    case 1:
      return <TransportStep />;
    case 2:
      return <ElectricityStep />;
    case 3:
      return <EatingHabitsStep />;
    case 4:
      return <EndStep />;
    default:
      return <StartStep />;
  }
}
