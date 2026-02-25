export interface Pokemon {
 id: number;
 name: string;
 height: number;
 weight: number;
}

export interface GetPokemonsResponse {
 pokemon: Pokemon[];
}

export interface GetPokemonVariables {
 limit: number;
 offset: number;
 search?: string;
}

export interface UsePokemonListParams {
 limit: number;
 offset: number;
 search?: string;
}
