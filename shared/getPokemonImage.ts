const BASE_IMAGE_URL =
 "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export function getPokemonImage(id: number) {
 return `${BASE_IMAGE_URL}/${id}.png`;
}
