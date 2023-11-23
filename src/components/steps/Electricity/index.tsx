"use client"

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// SERVICES
import { useStepContext } from "@/context/breadcrumbs";

// COMPONENTS
import Button from "@/components/Button";
import Select from "@/components/Inputs/select";
import InputNumber from "@/components/Inputs/numberr";
import { useState } from 'react';
import { OPTIONS_ELECTRICITY } from '@/constants/electricity';

const FormSchema = z.object({
  kWh: z.number({
    required_error: "* O consumo MENSAL de energia é obrigatorio!",
    invalid_type_error: "* Só é permitido números!"
  }),
  typeKwh: z.string({
    required_error: "* O tipo de energia é obrigatorio!",
  })
})

export default function ElectricityStep() {

  const { breadcrumbs, setBreadcrumbs, setErrorFormAnimation } = useStepContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data ", data)
    setBreadcrumbs(1 + breadcrumbs)
    setErrorFormAnimation(false)
  }

  function handleErrorFormAnimation() {
    if (Object.keys(errors).length !== 0)
      setErrorFormAnimation(true)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select
        errors={errors?.typeKwh?.message}
        control={control}
        options={OPTIONS_ELECTRICITY}
        label="Escolha o tipo de energia:"
        name="typeKwh"
      />

      <InputNumber
        errors={errors?.kWh?.message}
        control={control}
        htmlFor="kWh"
        name="kWh"
        label="* Insira seu consumo mensalmente de energia (kWh/mês):"
        placeholder="0,00 kWh/mês"
      />

      <Button label="Continuar" type="submit" onClick={handleErrorFormAnimation} />
    </form>
  )
}