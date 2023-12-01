"use client";

// IMPORTS
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// SERVICES
import { useStepContext } from "@/context/stepContext";

// COMPONENTS
import Button from "@/components/Button";
import { Checkbox, InputNumber } from "@/components/Inputs";

export default function TransportStep() {
  const { breadcrumbs, setBreadcrumbs, setErrorFormAnimation, setDataForm } =
    useStepContext();

  const FormSchema = z
    .object({
      checkbox1: z.boolean().default(false),
      checkbox2: z.boolean().default(false),
      checkbox3: z.boolean().default(false),
      carKm: z.number().default(0),
      efficiencyKm: z.number().default(0),
      busKm: z.number().default(0),
    })
    .refine((data) => data.checkbox1 || data.checkbox2 || data.checkbox3, {
      message: "* Pelo menos um checkbox1 deve ser selecionado",
      path: ["checkbox1"],
    })
    .refine((data) => !data.checkbox1 || data.carKm, {
      message: "* A distância percorrida é obrigatória",
      path: ["carKm"],
    })
    .refine((data) => !data.checkbox1 || data.efficiencyKm, {
      message: "* A eficiencia do seu veiculo é obrigatória",
      path: ["efficiencyKm"],
    })
    .refine((data) => !data.checkbox2 || data.busKm, {
      message: "* A distância percorrida é obrigatória",
      path: ["busKm"],
    });

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setBreadcrumbs(1 + breadcrumbs);
    setErrorFormAnimation(false);
    setDataForm({ transportCo2: data });
  }

  function handleErrorFormAnimation() {
    if (Object.keys(errors).length !== 0) setErrorFormAnimation(true);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-800 text-base font-bold">
        Qual meio de transporte você utiliza no seu dia a dia?
      </p>

      <small className="text-red-500 -mt-4">{errors?.checkbox1?.message}</small>

      <Checkbox
        errors={Boolean(errors?.checkbox1?.message)}
        control={control}
        htmlFor="checkbox1"
        name="checkbox1"
        label="Carro/Moto"
      />

      {watch("checkbox1") && (
        <div className="flex gap-4 w-full">
          <InputNumber
            errors={errors?.carKm?.message}
            control={control}
            htmlFor="carKm"
            name="carKm"
            label="* Distância percorrida"
            placeholder="0,00 km"
          />
          <InputNumber
            errors={errors?.efficiencyKm?.message}
            control={control}
            htmlFor="efficiencyKm"
            name="efficiencyKm"
            label="* Eficiencia do seu veiculo"
            placeholder="0,00 km"
          />
        </div>
      )}

      <Checkbox
        errors={Boolean(errors?.checkbox1?.message)}
        control={control}
        htmlFor="checkbox2"
        name="checkbox2"
        label="Ônibus/metro"
      />

      {watch("checkbox2") && (
        <InputNumber
          errors={errors?.busKm?.message}
          control={control}
          htmlFor="busKm"
          name="busKm"
          label="* Distância percorrida"
          placeholder="0,00 km"
        />
      )}

      <Checkbox
        errors={Boolean(errors?.checkbox1?.message)}
        control={control}
        htmlFor="checkbox3"
        name="checkbox3"
        label="Bicicleta/Pézão"
      />

      <div className="flex justify-between">
        <Button
          ghost
          label="Voltar"
          type="button"
          onClick={() => setBreadcrumbs(breadcrumbs - 1)}
        />
        <Button
          label="Continuar"
          type="submit"
          onClick={handleErrorFormAnimation}
        />
      </div>
    </form>
  );
}
