import { gql } from "@apollo/client";
export const GET_POKEMONS = gql`
 query GetPokemons($limit: Int!, $offset: Int!, $search: String) {
  pokemon(
   limit: $limit
   offset: $offset
   order_by: { id: asc }
   where: { name: { _ilike: $search } }
  ) {
   id
   name
   height
   weight
  }
 }
`;
