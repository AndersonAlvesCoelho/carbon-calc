"use client";

import { STEPS } from "@/constants/step";
import { useStepContext } from "@/context/stepContext";
import { ChevronRightIcon } from "lucide-react";

export default function Breadcrumbs() {
  const { breadcrumbs } = useStepContext();

  if (breadcrumbs === 4)
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Resultado final</h1>
        <p className="text-gray-800 text-base">
          Resumo de suas emissões de gases de efeito estufa anuais
        </p>
      </div>
    );

  if ([1, 2, 3].includes(breadcrumbs))
    return (
      <div className="flex justify-center gap-9">
        {STEPS.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center gap-2 hover:scale-105 transition duration-700 ease-in-out"
          >
            <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
              <div
                className={`flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full ${
                  breadcrumbs === item.number
                    ? "bg-purple-700 text-white"
                    : "bg-gray-100 text-gray-300"
                }`}
              >
                <span className="text-xl font-bold">{item.number}</span>
              </div>
              <span
                className={`font-bold text-xs md:text-base ${
                  breadcrumbs === item.number
                    ? "text-gray-800"
                    : "text-gray-300"
                }`}
              >
                {item.name}
              </span>
            </div>
            {STEPS.length !== index + 1 && (
              <ChevronRightIcon className="h-6 w-6 hidden lg:block" />
            )}
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">Vamos começar ?</h1>
      <p className="text-gray-800 text-base">
        Segui algumas instruções para calcular a sua pegada de carbono.
      </p>
    </div>
  );
}
