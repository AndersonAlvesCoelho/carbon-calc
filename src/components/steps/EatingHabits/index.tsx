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

export default function EatingHabitsStep() {
  const {
    dataForm,
    breadcrumbs,
    setBreadcrumbs,
    setErrorFormAnimation,
    setDataForm,
  } = useStepContext();

  const FormSchema = z
    .object({
      checkbox1: z.boolean().default(false),
      checkbox2: z.boolean().default(false),
      meat: z.number().default(0),
      vegetables: z.number().default(0),
    })
    .refine((data) => data.checkbox1 || data.checkbox2, {
      message: "* Pelo menos um checkbox deve ser selecionado",
      path: ["checkbox1"],
    })
    .refine((data) => !data.checkbox1 || data.meat, {
      message: "* Esse campo é obrigatória",
      path: ["meat"],
    })
    .refine((data) => !data.checkbox2 || data.vegetables, {
      message: "* Esse campo é obrigatória",
      path: ["vegetables"],
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

    const result = {
      electricityCo2: dataForm.electricityCo2,
      transportCo2: dataForm.transportCo2,
      eatingHabitsCo2: data,
    };

    setDataForm(result);
  }

  function handleErrorFormAnimation() {
    if (Object.keys(errors).length !== 0) setErrorFormAnimation(true);
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-800 text-base font-bold">
        Qual é a quantidade mensal de kg?
      </p>

      <small className="text-red-500 -mt-4">{errors?.checkbox1?.message}</small>

      <Checkbox
        errors={Boolean(errors?.checkbox1?.message)}
        control={control}
        htmlFor="checkbox1"
        name="checkbox1"
        label="Carne"
      />

      {watch("checkbox1") && (
        <InputNumber
          errors={errors?.meat?.message}
          control={control}
          htmlFor="meat"
          name="meat"
          label="* Infor a quantidade Carne e kg"
          placeholder="0,00 kg"
        />
      )}

      <Checkbox
        errors={Boolean(errors?.checkbox1?.message)}
        control={control}
        htmlFor="checkbox2"
        name="checkbox2"
        label="Vegetais"
      />

      {watch("checkbox2") && (
        <InputNumber
          errors={errors?.vegetables?.message}
          control={control}
          htmlFor="vegetables"
          name="vegetables"
          label="* Infor a quantidade Vegetais e kg"
          placeholder="0,00 kg"
        />
      )}

      <Button
        label="Continuar"
        type="submit"
        onClick={handleErrorFormAnimation}
      />
    </form>
  );
}
