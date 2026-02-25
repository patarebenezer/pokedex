import { GET_POKEMONS } from "@/features/pokemon/graphql/queries";
import {
 GetPokemonsResponse,
 GetPokemonVariables,
 UsePokemonListParams,
} from "@/features/pokemon/types";
import { useQuery } from "@apollo/client/react";

export function usePokemonList({
 limit,
 offset,
 search,
}: UsePokemonListParams) {
 const query = useQuery<GetPokemonsResponse, GetPokemonVariables>(
  GET_POKEMONS,
  {
   variables: {
    limit,
    offset,
    search: search ? `%${search}%` : "%%",
   },
  },
 );
 return {
  pokemons: query.data?.pokemon ?? [],
  loading: query.loading,
  error: query.error,
 };
}
