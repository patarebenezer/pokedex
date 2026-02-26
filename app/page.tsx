"use client";

import { useEffect } from "react";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import { usePokemonQueryState } from "@/features/pokemon/hooks/usePokemonQueryState";
import { usePokemonTypes } from "@/features/pokemon/hooks/usePokemonTypes";
import { FieldDescription } from "@/components/ui/field";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { toast } from "sonner";

const itemsOption = [
 { value: "id", label: "ID" },
 { value: "name", label: "Name" },
 { value: "height", label: "Height" },
 { value: "weight", label: "Weight" },
];

export default function Home() {
 const {
  limit,
  offset,
  where,
  order_by,
  updateSearch,
  updateSort,
  sortField,
  sortDirection,
  selectedTypes,
  updateTypes,
  nextPage,
  prevPage,
 } = usePokemonQueryState({ initialLimit: 8 });

 const { pokemons, loading, error } = usePokemonList({
  limit,
  offset,
  where,
  order_by,
 });

 const { types } = usePokemonTypes();

 useEffect(() => {
  if (error) {
   toast.error("Failed to fetch pokemons.", {
    position: "top-right",
    description: error.message,
   });
  } else if (!loading && pokemons.length === 0) {
   toast.info("No pokemons found.", {
    position: "top-right",
    description: "Try searching for another name.",
   });
  }
 }, [error, pokemons.length, loading]);

 return (
  <div className='p-6 space-y-6 max-w-4xl mx-auto'>
   {/* Header & Search Section */}
   <div className='space-y-2'>
    <Input
     type='text'
     placeholder='Search pokemon (e.g. Pikachu)...'
     onChange={(e) => updateSearch(e.target.value)}
     className='max-w-md'
     autoFocus
    />
    <FieldDescription>Choose the pokemon you like.</FieldDescription>
   </div>

   {/* Filter Section*/}
   <div className='flex flex-wrap items-center justify-end gap-3 relative z-30'>
    <p className='text-sm font-medium text-muted-foreground'>Filter & Sort</p>

    <Select
     value={sortField}
     onValueChange={(value) =>
      updateSort(value as "id" | "name" | "height" | "weight", sortDirection)
     }
    >
     <SelectTrigger className='w-auto bg-white'>
      <SelectValue placeholder='Select field' />
     </SelectTrigger>
     <SelectContent
      position='popper'
      className='z-100 min-w-32 bg-white shadow-md border border-muted'
     >
      <SelectGroup>
       <SelectLabel>Filter</SelectLabel>
       {itemsOption.map((item) => (
        <SelectItem key={item.value} value={item.value}>
         {item.label}
        </SelectItem>
       ))}
      </SelectGroup>
     </SelectContent>
    </Select>

    <Select
     value={sortDirection}
     onValueChange={(value) => updateSort(sortField, value as "asc" | "desc")}
    >
     <SelectTrigger className='w-auto bg-white'>
      <SelectValue placeholder='Order' />
     </SelectTrigger>
     <SelectContent
      position='popper'
      className='z-100 min-w-32 bg-white shadow-md border border-muted'
     >
      <SelectGroup>
       <SelectLabel>Sort</SelectLabel>
       <SelectItem value='asc'>Ascending</SelectItem>
       <SelectItem value='desc'>Descending</SelectItem>
      </SelectGroup>
     </SelectContent>
    </Select>
   </div>

   <div className='flex flex-wrap justify-center gap-2'>
    {types.map((type) => (
     <label key={type.id} className='flex items-center gap-1'>
      <input
       type='checkbox'
       checked={selectedTypes.includes(type.name)}
       onChange={(e) => {
        if (e.target.checked) {
         updateTypes([...selectedTypes, type.name]);
        } else {
         updateTypes(selectedTypes.filter((t) => t !== type.name));
        }
       }}
      />
      <span className='capitalize'>{type.name}</span>
     </label>
    ))}
   </div>

   {/* List Section */}
   <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
    {loading
     ? Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className='h-32 w-full rounded-xl' />
       ))
     : pokemons.map((pokemon) => (
        <div
         key={pokemon.id}
         className='p-4 border border-muted h-32 w-full rounded-xl shadow-sm hover:shadow-md transition-shadow bg-card'
        >
         <p className='font-bold text-lg capitalize'>{pokemon.name}</p>
         <div className='text-sm text-muted-foreground mt-2'>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
         </div>
        </div>
       ))}
   </div>

   {/* Pagination Section */}
   <div className='flex justify-center pt-4'>
    {loading ? (
     <div className='flex gap-2'>
      <Skeleton className='h-10 w-10 rounded-md' />
      <Skeleton className='h-10 w-10 rounded-md' />
     </div>
    ) : (
     !error &&
     pokemons.length > 0 && (
      <ButtonGroup>
       <Button
        variant='outline'
        size='icon'
        onClick={prevPage}
        disabled={offset === 0}
        aria-label='Previous Page'
       >
        <ArrowLeftIcon className='h-4 w-4' />
       </Button>
       <Button
        variant='outline'
        size='icon'
        onClick={nextPage}
        disabled={pokemons.length < limit}
        aria-label='Next Page'
       >
        <ArrowRightIcon className='h-4 w-4' />
       </Button>
      </ButtonGroup>
     )
    )}
   </div>
  </div>
 );
}
