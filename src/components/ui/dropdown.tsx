"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { PiCaretDown } from "react-icons/pi";

import { cn } from "@/utils/cn";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ options, placeholder = "Select an option", onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
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

    const handleOptionClick = (option: string) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    };

    return (
      <div
        ref={dropdownRef}
        className="dropdown"
        style={{ position: "relative", display: "inline-block" }}
      >
        <button
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "dropdown-toggle flex w-full items-center justify-between gap-[8px] rounded-[8px] border border-simpleGray300 bg-white px-[14px] py-[10px] text-left shadow-[0_1px_2px_#1018280D]",
            selectedOption ? "text-simpleBlack" : "text-simpleGray500"
          )}
        >
          {selectedOption || placeholder} {/* @ts-expect-error */}
          <PiCaretDown className="text-[20px] text-simpleGray500" />
        </button>
        {isOpen && (
          <ul
            role="listbox"
            className="dropdown-menu absolute left-0 top-full z-10 m-0 mt-[4px] flex max-h-[200px] w-full list-none flex-col gap-[8px] overflow-y-auto rounded-[8px] border border-simpleGray200 bg-white p-[8px] shadow-[0_6px_6px_#10182808]"
          >
            {options.map((option, index) => (
              <li
                key={index}
                role="option"
                aria-selected={selectedOption === option}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  "dropdown-item cursor-pointer rounded-[6px] p-[4px]",
                  selectedOption === option &&
                    "m-[-4px] bg-simpleGray200 p-[8px]"
                )}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default Dropdown;
