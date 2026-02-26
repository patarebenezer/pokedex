import { GET_POKEMON_TYPES } from "@/features/pokemon/graphql/queries";
import { GetPokemonTypesResponse } from "@/features/pokemon/types";
import { useQuery } from "@apollo/client/react";

export function usePokemonTypes() {
 const { data, loading, error } =
  useQuery<GetPokemonTypesResponse>(GET_POKEMON_TYPES);

 return {
  types: data?.type || [],
  loading,
  error,
 };
}
