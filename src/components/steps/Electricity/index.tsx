"use client";

// IMPORTS
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// SERVICES
import { OPTIONS_ELECTRICITY } from "@/constants/electricity";
import { useStepContext } from "@/context/stepContext";

// COMPONENTS
import Button from "@/components/Button";
import { CheckboxDropdown, InputNumber } from "@/components/Inputs";

export default function ElectricityStep() {
  const {
    dataForm,
    breadcrumbs,
    setBreadcrumbs,
    setErrorFormAnimation,
    setDataForm,
  } = useStepContext();

  const schemaCheckBoxDynamic = Object.fromEntries(
    OPTIONS_ELECTRICITY.map((item) => [item.name, z.boolean().default(false)])
  );

  const schemaInputDynamic = Object.fromEntries(
    OPTIONS_ELECTRICITY.map((item) => [
      item.name + "Input",
      z.number().default(0),
    ])
  );

  const FormSchema = z
    .object({
      ...schemaCheckBoxDynamic,
      ...schemaInputDynamic,
    })
    .refine(
      (data) => {
        const checkboxKeys = Object.keys(schemaCheckBoxDynamic);
        const inputKeys = Object.keys(schemaInputDynamic);

        // Verificação para checkboxes
        const checkboxesValid = checkboxKeys.some((key) => data[key]);

        // Verificação para inputs
        const inputsValid = inputKeys.every((inputKey) => {
          const checkboxKey = inputKey.replace("Input", "");
          return data[checkboxKey] ? data[inputKey] : true;
        });

        return checkboxesValid && inputsValid;
      },
      {
        message:
          "* Pelo menos um checkbox deve ser selecionado, e inputs correspondentes devem ser preenchidos",
        path: ["checkbox"],
      }
    );

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const checkBox = Object.keys(schemaCheckBoxDynamic).map((key) => {
      return { [key]: watch(key) ?? false };
    });
    const checkBoxResult = Object.assign({}, ...checkBox);

    const inputs = Object.keys(schemaInputDynamic).map((key) => {
      return { [key]: watch(key) ?? 0 };
    });
    const inputResult = Object.assign({}, ...inputs);

    const result = {
      electricityCo2: { ...checkBoxResult, ...inputResult },
      transportCo2: dataForm.transportCo2,
    };

    setBreadcrumbs(1 + breadcrumbs);
    setErrorFormAnimation(false);
    setDataForm(result);
  }

  function handleErrorFormAnimation() {
    if (Object.keys(errors).length !== 0) setErrorFormAnimation(true);
  }

  return (
    <div className="p-8 h-96 overflow-x-auto ">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-gray-800 text-base font-bold">
          Qual tipo de energia você utiliza?
        </p>
        <small className="text-red-500 -mt-4">
          {errors?.checkbox?.message}
        </small>

        <CheckboxDropdown
          option={OPTIONS_ELECTRICITY}
          errors={Boolean(errors?.checkbox?.message)}
          control={control}
          htmlFor="checkbox1"
        />

        {Object.keys(schemaInputDynamic).map((key) => {
          const optiTrans = OPTIONS_ELECTRICITY.find(
            (item) => item.name === key.replace("Input", "")
          );
          return (
            <div
              key={key}
              className={`${!watch(key.replace("Input", "")) && "hidden"}`}
            >
              <InputNumber
                key={key}
                errors={errors?.[key]?.message}
                control={control}
                htmlFor={key}
                name={key}
                label={`Informe o valor mensal de(a) energia ${optiTrans?.label}`}
                placeholder="0,00 kWh"
              />
            </div>
          );
        })}

        <div className="flex justify-between align-bottom">
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
    </div>
  );
}
