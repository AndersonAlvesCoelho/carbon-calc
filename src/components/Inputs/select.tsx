import * as React from 'react';

import { Controller, Control } from 'react-hook-form';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { value: number | string; label: string }[];
  control: Control;
  errors: string | undefined;
}

export default function Select({ label, options, name, errors, control, ...props }: SelectProps) {

  return (
    <Controller
      control={control}
      render={({ field: { onChange } }) => (
        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-base font-bold">{label}</label>
          <select
            onChange={(evt) => onChange(evt.target.value)}
            {...props}
            className="border p-4 rounded-md placeholder-gray-400 focus:border-purple-heart-400 focus:outline-none">
            <option>Selecione</option>
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 text-sm">{errors}</span>
        </ div>
      )}
      name={name}
    />
  )

};

