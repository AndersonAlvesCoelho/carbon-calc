import * as React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  htmlFor: string;
  errors: string | undefined;
}

export default function InputNumber<FormType extends FieldValues>({
  label,
  name,
  errors,
  control,
  ...props
}: InputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="flex flex-col gap-1 w-full ">
          <label className=" text-gray-800 text-base font-bold" htmlFor={name}>
            {label}
          </label>
          <input
            onChange={(evt) => onChange(Number(evt.target.value))}
            value={value}
            type="number"
            {...props}
            className={`border p-4 rounded-md placeholder-gray-400 focus:border-purple-heart-400 focus:outline-none
            ${errors && "border-red-500"}`}
          />
          <span className="text-red-500 text-sm"> {errors}</span>
        </div>
      )}
    />
  );
}
