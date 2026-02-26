import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
 query GetPokemons(
  $limit: Int!
  $offset: Int!
  $where: pokemon_bool_exp
  $order_by: [pokemon_order_by!]
 ) {
  pokemon(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
   id
   name
   height
   weight
  }
 }
`;

export const GET_POKEMON_TYPES = gql`
 query GetPokemonTypes {
  type(order_by: { name: asc }) {
   id
   name
  }
 }
`;
