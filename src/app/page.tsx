"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import Steps from "@/components/steps";
import { useStepContext } from "@/context/stepContext";

export default function Home() {
  const { errorFormAnimation } = useStepContext();

  return (
    <div
      className={`m-8 p-8 border rounded flex flex-col w-3/5 gap-8 
    ${errorFormAnimation && "animate-waving-hand border-red-500"}`}
    >
      <Breadcrumbs />

      <hr className="h-0.5 w-full bg-gray-100" />

      <Steps />
    </div>
  );
}
