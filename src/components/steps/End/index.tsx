"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Image from "next/image";
import Confetti from "react-dom-confetti";

import { OPTIONS_ELECTRICITY } from "@/constants/electricity";
import { useStepContext } from "@/context/stepContext";

export default function EndStep() {
  const { dataForm, setBreadcrumbs } = useStepContext();
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const [completed, setCompleted] = useState(false);

  const emissionFactor = {
    carKm: 2.3,
    busKm: 0.15,
    meat: 15,
    vegetables: 2,
  };

  const { eatingHabitsCo2, electricityCo2, transportCo2 } = dataForm;

  useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 1000);
  }, []);

  if (!eatingHabitsCo2 || !electricityCo2 || !transportCo2) return;

  const carKm =
    (transportCo2.carKm / transportCo2?.efficiencyKm) * emissionFactor.carKm ||
    0;
  const transportResult =
    carKm + transportCo2?.busKm * emissionFactor.busKm || 0;

  let electricityResult = 0;
  OPTIONS_ELECTRICITY.forEach((option) => {
    const inputKey = option.name + "Input";
    electricityResult += (electricityCo2 as any)[inputKey] * option.value;
  });

  const eatingHabitsResult =
    eatingHabitsCo2?.meat * emissionFactor.meat +
    eatingHabitsCo2?.vegetables * emissionFactor.vegetables;

  const result = transportResult + electricityResult + eatingHabitsResult;

  return (
    <div className="flex flex-col gap-8">
      <div className="gap-8 flex justify-center items-center">
        <div className="gap-4 flex flex-col items-center">
          <h2 className="text-gray-800 text-base font-semibold">Transporte</h2>
          <div className="mb-2 h-14 w-14 overflow-hidden rounded-full bg-gray-100 shadow-lg ">
            <Image
              alt="Icon de eth"
              src="/images/bicycle-outline.png"
              width={150}
              height={150}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <span className="flex gap-1 text-purple-900">
            <p className="text-xl">{transportResult.toFixed(3)}</p>
            <p className="text-base font-bold">CO2</p>
          </span>
        </div>
        <div className="gap-4 flex flex-col items-center">
          <h2 className="text-gray-800 text-base font-semibold">
            Consumo de Energia
          </h2>
          <div className="mb-2 h-14 w-14 overflow-hidden rounded-full bg-gray-100 shadow-lg ">
            <Image
              alt="Icon de eth"
              src="/images/eco-car-outline.png"
              width={150}
              height={150}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <span className="flex gap-1 text-purple-900">
            <p className="text-xl">{electricityResult.toFixed(3)}</p>
            <p className="text-base font-bold">CO2</p>
          </span>
        </div>
        <div className="gap-4 flex flex-col items-center">
          <h2 className="text-gray-800 text-base font-semibold">
            Hábitos Alimentares
          </h2>
          <div className="mb-2 h-14 w-14 overflow-hidden rounded-full bg-gray-100 shadow-lg ">
            <Image
              alt="Icon de eth"
              src="/images/chicken-outline.png"
              width={150}
              height={150}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <span className="flex gap-1 text-purple-900">
            <p className="text-xl">{eatingHabitsResult.toFixed(3)}</p>
            <p className="text-base font-bold">CO2</p>
          </span>
        </div>
      </div>
      <Confetti active={completed} config={config} />

      <div className="gap-4 flex flex-col items-center">
        <h2 className="text-gray-800 text-base font-semibold">
          Emissão de CO2 mensal
        </h2>
        <div className="mb-2 h-14 w-14 overflow-hidden rounded-full bg-gray-100 shadow-lg ">
          <Image
            alt="Icon de eth"
            src="/images/ecology-outline.png"
            width={150}
            height={150}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <span className="flex gap-1 text-purple-900">
          <p className="text-xl">{result.toFixed(3)}</p>
          <p className="text-base font-bold">CO2</p>
        </span>
        <Button
          ghost
          label="Finalizar"
          type="submit"
          onClick={() => setBreadcrumbs(0)}
        />
      </div>
    </div>
  );
}
