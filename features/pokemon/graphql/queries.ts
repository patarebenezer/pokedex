import { gql } from "@apollo/client";
export const GET_POKEMONS = gql`
 query GetPokemons($limit: Int!, $offset: Int!) {
  pokemon(limit: $limit, offset: $offset, order_by: { id: asc }) {
   id
   name
   height
   weight
  }
 }
`;
