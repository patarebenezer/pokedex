"use client";

import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, LoaderIcon } from "lucide-react";

function AlertError() {
 return (
  <Alert variant='destructive' className='max-w-md text-red-600'>
   <AlertCircleIcon />
   <AlertTitle>Error</AlertTitle>
   <AlertDescription>
    Failed to fetch pokemons. Please try again.
   </AlertDescription>
  </Alert>
 );
}

export default function Home() {
 const { pokemons, loading, error } = usePokemonList(2, 0);

 if (loading) return <LoaderIcon className='animate-spin' />;
 if (error) return <AlertError />;

 return (
  <div className='p-6'>
   {pokemons.map((pokemon) => (
    <div key={pokemon.id} className='p-4 border rounded'>
     <p>{pokemon.name}</p>
     <p>{pokemon.height}</p>
     <p>{pokemon.weight}</p>
    </div>
   ))}
  </div>
 );
}
