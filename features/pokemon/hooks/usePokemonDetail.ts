import { useQuery } from "@apollo/client/react";
import { GET_POKEMON_DETAIL } from "@/features/pokemon/graphql/queries";
import { GetPokemonsResponse } from "@/features/pokemon/types";

export function usePokemonDetail(id: number | null) {
 const { data, loading, error } = useQuery<GetPokemonsResponse>(
  GET_POKEMON_DETAIL,
  {
   variables: { id },
   skip: !id,
  },
 );

 return {
  pokemon: data?.pokemon?.[0] ?? null,
  loading,
  error,
 };
}
