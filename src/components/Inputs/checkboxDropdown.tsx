"use client";

import { useState } from "react";
import { Control } from "react-hook-form";

import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import { Checkbox } from ".";

interface CheckboxDropdownProps {
  control: Control;
  option: { label: string; name: string }[];
  htmlFor: string;
  errors: boolean;
}

export default function CheckboxDropdown({
  errors,
  control,
  option,
}: CheckboxDropdownProps) {
  const [isOpen, setIsopen] = useState(false);
  const [select, setSelect] = useState(option);

  function handleSearch(value: string) {
    const filter = option.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    );
    setSelect(filter);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <button
        onClick={() => setIsopen(!isOpen)}
        className={`w-full inline-flex justify-between items-center px-4 py-2 text-sm text-gray-400 border p-4 rounded-md placeholder-gray-400 focus:border-purple-heart-400 focus:outline-none  ${
          errors && "border-red-500"
        }`}
        type="button"
      >
        Selecione
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 " />
        ) : (
          <ChevronDownIcon className="h-6 w-6 " />
        )}
      </button>

      <div
        className={`z-10 w-full bg-white rounded-lg shadow ${
          !isOpen && "hidden"
        }`}
      >
        <div className="p-3 w-full">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={(evt) => handleSearch(evt.target.value)}
              className="border p-2.5 rounded-md placeholder-gray-400 focus:border-purple-heart-400 focus:outline-none
                  bg-gray-50  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500  block w-full ps-10"
              placeholder="Pesquisar"
            />
          </div>
        </div>
        <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
          {select.map((item, index) => (
            <li key={index}>
              <div className="flex items-center p-2 rounded hover:bg-gray-100">
                <Checkbox
                  errors={false}
                  control={control}
                  htmlFor={item.name}
                  name={item.name}
                  label={item.label}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
