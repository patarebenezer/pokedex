"use client";

import { useEffect, useState } from "react";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import { usePokemonQueryState } from "@/features/pokemon/hooks/usePokemonQueryState";
import {
 usePokemonCompare,
 usePokemonCompareData,
} from "@/features/pokemon/hooks/usePokemonCompare";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/app/components/Pagination";
import CompareModal from "@/app/components/CompareModal";
import PokemonFloatingCompare from "@/features/pokemon/components/PokemonFloatingCompare";
import PokemonFilters from "@/features/pokemon/components/PokemonFilters";
import PokemonCard from "@/features/pokemon/components/PokemonCard";
import { PAGE_TITLE } from "@/shared/constant";
import { toast } from "sonner";

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
  toggleType,
  nextPage,
  prevPage,
 } = usePokemonQueryState({ initialLimit: 8 });

 const { selectedIds, toggleSelect, isSelected, isMaxSelected } =
  usePokemonCompare();
 const { pokemons, loading, error } = usePokemonList({
  limit,
  offset,
  where,
  order_by,
 });
 const { pokemons: comparePokemons, loading: compareLoading } =
  usePokemonCompareData(selectedIds);

 const canCompare = selectedIds.length === 2;
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
  if (!loading && error) {
   toast.error("Failed to fetch pokemons.", {
    description: error.message,
   });
  }
 }, [error, loading]);

 useEffect(() => {
  if (!loading && !error && pokemons.length === 0) {
   toast.info("No pokemons found.", {
    description: "Try searching for another name.",
   });
  }
 }, [loading, error, pokemons.length]);

 return (
  <div className='p-6 space-y-6 max-w-4xl mx-auto min-h-screen relative'>
   {/* ================= SEARCH & HEADER ================= */}
   <div className='space-y-2'>
    <h1 className='text-2xl font-bold text-slate-900'>{PAGE_TITLE}</h1>
    <Input
     type='text'
     placeholder='Search pokemon...'
     onChange={(e) => updateSearch(e.target.value)}
     className='max-w-md bg-white'
    />
    <FieldDescription>
     Choose up to 2 pokemons to compare stats side-by-side.
    </FieldDescription>
   </div>

   {/* ================= FILTERS & SORT ================= */}
   <PokemonFilters
    selectedTypes={selectedTypes}
    toggleType={(value) => toggleType(value)}
    sortField={sortField}
    sortDirection={sortDirection}
    updateSort={(value, direction) =>
     updateSort(value as "id" | "name" | "height" | "weight", direction)
    }
   />

   {/* ================= LIST AREA ================= */}
   <div className='pb-12'>
    {" "}
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
     {loading
      ? Array.from({ length: limit }).map((_, i) => {
         return <Skeleton key={"" + i} className='h-44 w-full rounded-2xl' />;
        })
      : pokemons.map((pokemon) => {
         return (
          <PokemonCard
           key={pokemon.id}
           pokemon={pokemon}
           isSelected={isSelected(pokemon.id)}
           isMaxSelected={isMaxSelected}
           onToggle={toggleSelect}
          />
         );
        })}
    </div>
   </div>

   {/* ================= FLOATING COMPARE BAR ================= */}
   {canCompare && !isModalOpen && (
    <PokemonFloatingCompare
     selectedIds={selectedIds}
     onToggle={toggleSelect}
     onCompare={() => setIsModalOpen(true)}
    />
   )}

   {/* ================= COMPARE MODAL ================= */}
   <CompareModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    pokemons={comparePokemons}
    loading={compareLoading}
   />

   {/* ================= PAGINATION ================= */}
   {!error && pokemons.length > 0 && (
    <Pagination
     offset={offset}
     limit={limit}
     itemLength={pokemons.length}
     prevPage={prevPage}
     nextPage={nextPage}
    />
   )}
  </div>
 );
}
