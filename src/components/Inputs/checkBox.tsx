import * as React from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  htmlFor: string;
  errors: boolean;
}

export default function Checkbox<FormType extends FieldValues>({
  label,
  name,
  errors,
  control,
  onChange,
  value,
  ...props
}: CheckboxProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <div className="flex items-center gap-2">
          <input
            onChange={(evt) => onChange(evt.target.checked)}
            checked={value ? value : false}
            type="checkbox"
            {...props}
            id={name}
            className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-purple-700 checked:bg-purple-700 checked:before:bg-purple-700 hover:before:opacity-10
            ${errors && "border-red-700"}`}
          />
          <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <label className="text-gray-800 text-base" htmlFor={name}>
            {label}
          </label>
        </div>
      )}
    />
  );
}
