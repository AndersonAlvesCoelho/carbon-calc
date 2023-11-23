"use client"

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// SERVICES
import { OPTIONS_FUEL, OPTIONS_TRANSPORT } from '@/constants/transport';
import { useStepContext } from "@/context/breadcrumbs";

// COMPONENTS
import Button from "@/components/Button";
import Select from "@/components/Inputs/select";
import InputNumber from "@/components/Inputs/numberr";



export default function TransportStep() {

  const { breadcrumbs, setBreadcrumbs, setErrorFormAnimation } = useStepContext()

  const FormSchema = z.object({
    km: z.number({
      required_error: "* A distância percorre é obrigatorio!",
      invalid_type_error: "* Só é permitido números!"
    }),
    transport: z.string({
      required_error: "* O tipo de transporte é obrigatorio!",
    }),
    fuel: z.string({
      required_error: "* O tipo de energia é obrigatório para o transporte de automóveis!",
    })
  })
  
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data ", data)
    // setBreadcrumbs(1 + breadcrumbs)
    // setErrorFormAnimation(false)
  }

  function handleErrorFormAnimation() {
    if (Object.keys(errors).length !== 0)
      setErrorFormAnimation(true)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Select
        errors={errors?.transport?.message}
        control={control}
        options={OPTIONS_TRANSPORT}
        label="Escolha o tipo de transporte:"
        name="transport"
      />

      {watch("transport") === 'automobile' && (
        <Select
          errors={errors?.fuel?.message}
          control={control}
          options={OPTIONS_FUEL}
          label="Informe o tipo de combustível:"
          name="fuel"
        />
      )}

      <InputNumber
        errors={errors?.kWh?.message}
        control={control}
        htmlFor="km"
        name="km"
        label="* Digite a distância que você percorre mensalmente (km/mês):"
        placeholder="0,00 km/mês"
      />

      <Button label="Continuar" type="submit" onClick={handleErrorFormAnimation} />
    </form>
  )
}