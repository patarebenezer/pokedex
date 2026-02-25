"use client";

import { useEffect, useState } from "react";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { FieldDescription } from "@/components/ui/field";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
 const [search, setSearch] = useState("");
 const debounceSearch = useDebounce(search, 500);
 const { pokemons, loading, error } = usePokemonList({
  limit: 10,
  offset: 0,
  search: debounceSearch,
 });

 useEffect(() => {
  if (error) {
   toast.error("Failed to fetch pokemons. Please try again.", {
    position: "top-center",
    description: error.message,
   });
  } else if (!loading && pokemons.length === 0) {
   toast("No pokemons found. Try adjusting your search.", {
    position: "top-center",
    description: "Try searching for 'Pikachu' or 'Bulbasaur'.",
   });
  }
 }, [error, pokemons.length, loading]);

 return (
  <div className='p-6 space-y-4'>
   <Input
    type='text'
    placeholder='Search pokemon...'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
   />
   <FieldDescription>Choose the pokemon you like.</FieldDescription>

   {loading && <LoaderIcon className='animate-spin mx-auto' />}

   <div className='grid grid-cols-2 gap-4'>
    {pokemons.map((pokemon) => (
     <div key={pokemon.id} className='p-4 rounded shadow-md'>
      <p className='font-bold capitalize'>{pokemon.name}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
     </div>
    ))}
   </div>
  </div>
 );
}
