"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { UseFormRegisterReturn } from "react-hook-form";
import { PiMagnifyingGlass } from "react-icons/pi";

import { cn } from "@/utils/cn";

import { Input } from "./ui/input";

interface BaseSearchWithComponentProps<T> {
  data: T[];
  register?: UseFormRegisterReturn;
  placeholder: string;
  renderComponent: (
    item: T,
    isSelected: boolean,
    onClick: () => void
  ) => ReactNode;
  filterFunction?: (item: T, search: string) => boolean;
  getItemName: (item: T) => string;
  disableInput?: boolean;
}

interface SingleSearchProps<T> extends BaseSearchWithComponentProps<T> {
  multiple?: false;
  selectedItems?: T;
  setSelectedItems: Dispatch<SetStateAction<T | undefined>>;
}

interface MultipleSearchProps<T> extends BaseSearchWithComponentProps<T> {
  multiple: true;
  selectedItems?: T[];
  setSelectedItems: Dispatch<SetStateAction<T[]>>;
}

type SearchWithComponentProps<T> =
  | SingleSearchProps<T>
  | MultipleSearchProps<T>;

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
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
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

      const filteredItems = data.filter(
        (item) =>
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
      const typedSetSelected = setSelectedItems as Dispatch<
        SetStateAction<T[] | undefined>
      >;
      const newSelectedItems = [...(selectedItems as T[]), item];
      typedSetSelected(newSelectedItems);
    } else {
      const typedSetSelected = setSelectedItems as Dispatch<
        SetStateAction<T | undefined>
      >;
      typedSetSelected(item);
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
        valid={
          multiple
            ? Array.isArray(selectedItems) && selectedItems.length > 0
            : selectedItems !== undefined
        }
        {...register}
        onChange={(e) => {
          register?.onChange?.(e);
          setSearch(e.target.value);
        }}
        onInvalid={(e) => {
          const isInvalid =
            !selectedItems ||
            (Array.isArray(selectedItems) && selectedItems.length === 0) ||
            search === "";

          e.currentTarget.setCustomValidity(
            isInvalid ? "Please select an item" : ""
          );
        }}
        disabled={disableInput}
        required
      />

      {loading && <div className="mt-2 text-sm text-gray-500">Loading...</div>}

      {results.length > 0 && isOpen && (
        <div className="absolute z-10 mt-2 flex max-h-[320px] w-full flex-col gap-[4px] overflow-y-auto rounded-lg bg-white p-2 shadow-lg">
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
