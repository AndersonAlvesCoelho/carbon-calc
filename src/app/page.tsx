"use client"

import Steps from "@/components/steps";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useStepContext } from "@/context/breadcrumbs";

export default function Home() {

  const { errorFormAnimation } = useStepContext()

  return (
    <div className={`p-8 border rounded flex flex-col gap-8  
    ${errorFormAnimation && 'animate-waving-hand border-red-500'}`}>
      
      <Breadcrumbs />

      <hr className="h-0.5 w-full bg-gray-100" />

      <Steps />
    </div>
  )
}
