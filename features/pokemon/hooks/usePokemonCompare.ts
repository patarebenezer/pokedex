import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_COMPARE } from "../graphql/queries";
import { GetPokemonsResponse } from "@/features/pokemon/types";

const MAX_COMPARE = 2;

export function usePokemonCompare() {
 const [selectedIds, setSelectedIds] = useState<number[]>([]);

 const toggleSelect = (id: number) => {
  setSelectedIds((prev) => {
   if (prev.includes(id)) {
    return prev.filter((item) => item !== id);
   }

   if (prev.length >= MAX_COMPARE) {
    return prev;
   }

   return [...prev, id];
  });
 };

 const clearSelection = () => {
  setSelectedIds([]);
 };

 return {
  selectedIds,
  toggleSelect,
  clearSelection,
  isSelected: (id: number) => selectedIds.includes(id),
  isMaxSelected: selectedIds.length >= MAX_COMPARE,
 };
}

export function usePokemonCompareData(ids: number[]) {
 const { data, loading, error } = useQuery<GetPokemonsResponse>(
  GET_POKEMON_COMPARE,
  {
   variables: { ids },
   skip: ids.length !== 2,
  },
 );

 return {
  pokemons: data?.pokemon ?? [],
  loading,
  error,
 };
}
