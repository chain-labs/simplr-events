"use client";

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { PiMagnifyingGlass } from "react-icons/pi";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";

interface SearchWithComponentProps<T> {
  data: T[];
  register?: UseFormRegisterReturn;
  placeholder: string;
  selectedItems: T | T[] | undefined;
  setSelectedItems: Dispatch<SetStateAction<T | T[] | undefined>>;
  renderComponent: (item: T, isSelected: boolean, onClick: () => void) => ReactNode;
  filterFunction?: (item: T, search: string) => boolean;
  getItemName: (item: T) => string;
  disableInput?: boolean;
  multiple?: boolean;
}

export default function SearchWithComponent<T>({
  data,
  register,
  placeholder,
  selectedItems,
  setSelectedItems,
  renderComponent,
  filterFunction,
  getItemName,
  disableInput,
  multiple = false,
}: SearchWithComponentProps<T>) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      const filteredItems = data.filter((item) =>
        filterFunction?.(item, search) ?? 
        getItemName(item).toLowerCase().includes(search.toLowerCase())
      );
      
      setResults(filteredItems);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, data, filterFunction, getItemName]);

  // Handle item selection
  const handleItemClick = (item: T) => {
    if (multiple) {
      setSelectedItems((prev) => {
        const prevArray = Array.isArray(prev) ? prev : [];
        return prevArray.includes(item) 
          ? prevArray.filter(i => i !== item)
          : [...prevArray, item];
      });
    } else {
      setSelectedItems(item);
      setSearch(getItemName(item));
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        placeholder={placeholder}
        icon={<PiMagnifyingGlass />}
        iconPosition="left"
        value={search}
        onClick={() => setIsOpen(true)}
        valid={multiple 
          ? Array.isArray(selectedItems) && selectedItems.length > 0
          : selectedItems !== undefined
        }
        {...register}
        onChange={(e) => {
          register?.onChange?.(e);
          setSearch(e.target.value);
        }}
        onInvalid={(e) => {
          const isInvalid = !selectedItems || 
            (Array.isArray(selectedItems) && selectedItems.length === 0) ||
            search === "";
          
          e.currentTarget.setCustomValidity(
            isInvalid ? "Please select an item" : ""
          );
        }}
        disabled={disableInput}
        required
      />

      {loading && (
        <div className="mt-2 text-sm text-gray-500">Loading...</div>
      )}

      {results.length > 0 && isOpen && (
        <div className="absolute z-10 mt-2 max-h-[320px] w-full overflow-y-auto rounded-lg flex flex-col gap-[4px] bg-white p-2 shadow-lg">
          {results.map((item) =>
            renderComponent(
              item,
              multiple
                ? Array.isArray(selectedItems) && selectedItems.includes(item)
                : selectedItems === item,
              () => handleItemClick(item)
            )
          )}
        </div>
      )}
    </div>
  );
}