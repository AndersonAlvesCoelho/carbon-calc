import * as React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  htmlFor: string
}
export default function Radio({ htmlFor, label, ...props }: RadioProps) {
  return (
    <div className="flex items-center gap-2">
      <input type="radio" {...props} />
      <label className="text-gray-800 text-base font-bold" htmlFor={htmlFor}>{label}</label>
    </div>
  );
};

