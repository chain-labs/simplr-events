"use client";

import { useMemo, useState } from "react";

type FilterValue = string | number | boolean | undefined;
type FilterableItem = Record<string, any>;
type FilterConfig<T> = Partial<Record<keyof T, FilterValue>>;

export function useDataFilter<T extends FilterableItem>(items: T[]) {
  const [filters, setFilters] = useState<FilterConfig<T>>({});

  const filteredData = useMemo(() => {
    return items.filter((item) => {
      if (Object.keys(filters).length === 0) return true;

      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined) return true;

        const itemValue = item[key as keyof T];

        if (typeof value === "string" && typeof itemValue === "string") {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }

        return itemValue === value;
      });
    });
  }, [items, filters]);

  const setFilter = <K extends keyof T>(field: K, value: FilterValue) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const removeFilterElement = <K extends keyof T>(field: K, elementToRemove: FilterValue) => {
    setFilters((prev) => {
      const currentValue = prev[field];
      if (typeof currentValue === 'string' && typeof elementToRemove === 'string') {
        const newValue = currentValue.replace(elementToRemove, '').trim();
        return {
          ...prev,
          [field]: newValue || undefined, // Remove the field if empty
        };
      }
      return prev;
    });
  };

  return {
    filters,
    filteredData,
    setFilter,
    removeFilterElement,
    clearFilters: () => setFilters({}),
    clearFilter: (field: keyof T) =>
      setFilters((prev) => {
        const { [field]: _, ...rest } = prev;
        return rest as FilterConfig<T>;
      }),
  };
}
