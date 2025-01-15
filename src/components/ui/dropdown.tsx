"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { UseFormRegisterReturn } from "react-hook-form";
import { IconType } from "react-icons";
import { PiCaretDown } from "react-icons/pi";

import { cn } from "@/utils/cn";

import { Input } from "./input";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  Icon?: IconType | React.ReactNode;
  inputSearchable?: boolean;
  openingDirection?: "up" | "down";
  valid?: boolean;
  register?: UseFormRegisterReturn;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      placeholder = "Select an option",
      onChange,
      Icon = PiCaretDown,
      inputSearchable = false,
      openingDirection = "down",
      valid = false,
      register,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<
      DropdownOption | undefined
    >(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleOptionClick = (option: DropdownOption) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        register?.onChange({ target: { value: option.value } });
        onChange(option.value);
      }
    };

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div
        ref={dropdownRef}
        className="dropdown"
        style={{ position: "relative", display: "inline-block" }}
      >
        <select
          {...register}
          {...props}
          className="sr-only"
          value={selectedOption?.value}
          defaultValue={undefined}
        >
          {[
            {
              value: undefined,
              label: "select an option",
            },
            ...options,
          ].map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "dropdown-toggle flex w-full items-center justify-between gap-[8px] rounded-[8px] border border-simpleGray300 bg-white px-[12px] py-[8px] text-left shadow-[0_1px_2px_#1018280D]",
            selectedOption ? "text-simpleBlack" : "text-simpleGray500",
            valid &&
              "border-[#D6BBFB] text-simpleGray900 shadow-[0_0_0_4px_#9E77ED3D] focus:ring-[4px] focus:ring-[#9E77ED3D]"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}{" "}
          {/* @ts-expect-error */}
          <div className="text-[20px] text-simpleGray500">{Icon}</div>
        </button>
        {isOpen && (
          <div
            className={cn(
              "dropdown-menu-container absolute left-0 z-10 w-full rounded-[8px] border border-simpleGray200 bg-white shadow-[0_6px_6px_#10182808]",
              openingDirection === "up"
                ? "bottom-full mb-[4px]"
                : "top-full mt-[4px]"
            )}
          >
            {inputSearchable && (
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                autoFocus
              />
            )}
            <ul
              role="listbox"
              className="dropdown-menu list-none m-0 max-h-[200px] overflow-y-auto rounded-[16px] bg-white p-[8px]"
            >
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                  onClick={() => handleOptionClick(option)}
                  className={cn(
                    "dropdown-item cursor-pointer rounded-[16px] bg-simpleWhite p-[16px]",
                    selectedOption?.value === option.value &&
                      "bg-simpleGray200 text-simpleGray900"
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

export default Dropdown;
