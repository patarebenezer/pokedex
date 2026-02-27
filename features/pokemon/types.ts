export interface Pokemon {
 id: number;
 name: string;
 height: number;
 weight: number;
 stats?: PokemonStat[];
 pokemonstats?: PokemonStat[];
}

interface PokemonStat {
 base_stat: number;
 stat: {
  name: string;
 };
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

export interface PokemonDetailResponse {
 pokemon_by_pk: {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemontypes: {
   type: { name: string };
  }[];
  pokemonstats: {
   base_stat: number;
   stat: { name: string };
  }[];
 };
}

export interface PokemonCardProps {
 pokemon: Pokemon;
 isSelected: boolean;
 isMaxSelected: boolean;
 onToggle: (id: number) => void;
}

export interface CompareFloatingBarProps {
 selectedIds: number[];
 onToggle: (id: number) => void;
 onCompare: () => void;
}

export interface PokemonFiltersProps {
 selectedTypes: string[];
 toggleType: (type: string) => void;
 sortField: string;
 sortDirection: "asc" | "desc";
 updateSort: (value: string, direction: "asc" | "desc") => void;
}

export interface CompareModalProps {
 isOpen: boolean;
 onClose: () => void;
 pokemons: Pokemon[];
 loading: boolean;
}
