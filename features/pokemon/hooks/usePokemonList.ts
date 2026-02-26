import { useQuery } from "@apollo/client/react";
import { GET_POKEMONS } from "@/features/pokemon/graphql/queries";
import {
 GetPokemonsResponse,
 GetPokemonsVariables,
} from "@/features/pokemon/types";

export function usePokemonList(variables: GetPokemonsVariables) {
 const { data, loading, error } = useQuery<
  GetPokemonsResponse,
  GetPokemonsVariables
 >(GET_POKEMONS, {
  variables,
 });
 return {
  pokemons: data?.pokemon ?? [],
  loading: loading,
  error: error,
 };
}
