export function getPokemonImage(id: number) {
 return `${process.env.NEXT_PUBLIC_POKEMON_IMAGE_URL}/${id}.png`;
}

export const itemsOption = [
 { value: "id", label: "ID" },
 { value: "name", label: "Name" },
 { value: "height", label: "Height" },
 { value: "weight", label: "Weight" },
] as const;
