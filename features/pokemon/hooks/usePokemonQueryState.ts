import { useMemo, useState } from "react";
import {
 GetPokemonsVariables,
 UsePokemonQueryStateOptions,
} from "@/features/pokemon/types";

type SortDirection = "asc" | "desc";

export function usePokemonQueryState(options?: UsePokemonQueryStateOptions) {
 const [search, setSearch] = useState<string>("");
 const [sortField, setSortField] = useState<
  "id" | "name" | "height" | "weight"
 >("id");
 const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
 const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
 const [offset, setOffset] = useState<number>(0);
 const limit = options?.initialLimit ?? 10;

 const updateSearch = (value: string) => {
  setSearch(value);
  setOffset(0);
 };

 const updateSort = (field: typeof sortField, direction: SortDirection) => {
  setSortField(field);
  setSortDirection(direction);
  setOffset(0);
 };

 const where = useMemo(() => {
  const conditions: Record<string, unknown>[] = [];
  if (search) {
   conditions.push({
    name: {
     _ilike: `%${search}%`,
    },
   });
  }
  if (selectedTypes.length > 0) {
   conditions.push({
    pokemontypes: {
     type: {
      name: {
       _in: selectedTypes,
      },
     },
    },
   });
  }

  if (conditions.length === 0) return {};

  return { _and: conditions };
 }, [search, selectedTypes]);

 const updateTypes = (types: string[]) => {
  setSelectedTypes(types);
  setOffset(0);
 };

 const order_by = useMemo<GetPokemonsVariables["order_by"]>(() => {
  return [
   {
    [sortField]: sortDirection,
   },
  ];
 }, [sortField, sortDirection]);

 return {
  search,
  offset,
  limit,
  where,
  order_by,
  sortField,
  sortDirection,
  selectedTypes,
  updateSearch,
  updateSort,
  updateTypes,
  nextPage: () => setOffset((prev) => prev + limit),
  prevPage: () => setOffset((prev) => Math.max(prev - limit, 0)),
 };
}
