import { GET_POKEMONS } from "@/features/pokemon/graphql/queries";
import {
 GetPokemonsResponse,
 GetPokemonVariables,
} from "@/features/pokemon/types";
import { useQuery } from "@apollo/client/react";

export function usePokemonList(limit: number, offset: number) {
 const query = useQuery<GetPokemonsResponse, GetPokemonVariables>(
  GET_POKEMONS,
  {
   variables: { limit, offset },
  },
 );
 return {
  pokemons: query.data?.pokemon ?? [],
  loading: query.loading,
  error: query.error,
 };
}
