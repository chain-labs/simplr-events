"use client";

import React, { useState } from "react";

import { cn } from "@/utils/cn";

import RadioButton from "./radio-button";

interface SelectProps {
  options: string[];
  onSelect: (selected: string) => void;
  allowUserInput?: boolean;
  userInputPlaceholder?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  allowUserInput = false,
  userInputPlaceholder = "Enter your own option",
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id);
    onSelect(event.target.value);
  };

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInput(event.target.value);
    setSelectedOption(event.target.id);
    onSelect(event.target.value);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {options.map((option, index) => (
        <label
          key={option}
          className={cn(
            "flex w-full items-center gap-[8px] rounded-[12px] p-[16px]",
            selectedOption === `option-${index}`
              ? "ring-2 ring-inset ring-simpleBlue"
              : "ring-1 ring-simpleGray200",
            "bg-simpleWhite"
          )}
        >
          <RadioButton
            id={`option-${index}`}
            name="option"
            value={option}
            checked={selectedOption === `option-${index}`}
            onChange={handleOptionChange}
          />

          {option}
        </label>
      ))}
      {allowUserInput && (
        <label
          className={cn(
            "flex w-full items-center gap-[8px] rounded-[12px] p-[16px]",
            selectedOption === "user-input"
              ? "ring-2 ring-inset ring-simpleBlue"
              : "ring-1 ring-simpleGray200",
            "bg-simpleWhite"
          )}
        >
          <RadioButton
            id="user-input"
            name="option"
            value={userInput}
            checked={selectedOption === "user-input"}
            onChange={handleOptionChange}
          />
          <input
            id="user-input"
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            placeholder={userInputPlaceholder}
            className="w-full bg-transparent focus:outline-none"
          />
        </label>
      )}
    </div>
  );
};

export default Select;
