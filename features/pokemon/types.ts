export interface Pokemon {
 id: number;
 name: string;
 height: number;
 weight: number;
}

export interface GetPokemonsResponse {
 pokemon: Pokemon[];
}

export interface GetPokemonsVariables {
 limit: number;
 offset: number;
 where?: Record<string, unknown>;
 order_by?: Record<string, "asc" | "desc">[];
}

export interface UsePokemonQueryStateOptions {
 initialLimit?: number;
}

export interface PokemonType {
 id: number;
 name: string;
}

export interface GetPokemonTypesResponse {
 type: PokemonType[];
}
