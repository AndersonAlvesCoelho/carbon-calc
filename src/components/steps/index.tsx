"use client"

import { useStepContext } from "@/context/breadcrumbs"
import ElectricityStep from "./Electricity"
import TransportStep from "./Transport"


export default function Steps() {

  const { breadcrumbs } = useStepContext()

  switch (breadcrumbs) {
    case 1:
      return (
        <ElectricityStep />
      )
    case 2:
      return (
        <TransportStep />
      )
    default:
      return (
        <h1>Hello Word</h1>
      )
  }
}