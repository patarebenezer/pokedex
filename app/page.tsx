"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import { usePokemonQueryState } from "@/features/pokemon/hooks/usePokemonQueryState";
import { usePokemonTypes } from "@/features/pokemon/hooks/usePokemonTypes";
import { FieldDescription } from "@/components/ui/field";
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/app/components/Modal";
import {
 usePokemonCompare,
 usePokemonCompareData,
} from "@/features/pokemon/hooks/usePokemonCompare";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ArrowLeftIcon, ArrowRightIcon, Check, Plus } from "lucide-react";
import { getPokemonImage } from "@/shared/getPokemonImage";

const itemsOption = [
 { value: "id", label: "ID" },
 { value: "name", label: "Name" },
 { value: "height", label: "Height" },
 { value: "weight", label: "Weight" },
] as const;

export default function Home() {
 /**
  * Query State
  */
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

 /**
  * Compare selection state
  */
 const { selectedIds, toggleSelect, isSelected, isMaxSelected } =
  usePokemonCompare();

 /**
  * List fetching
  */
 const { pokemons, loading, error } = usePokemonList({
  limit,
  offset,
  where,
  order_by,
 });

 /**
  * Compare fetching
  */
 const { pokemons: comparePokemons, loading: compareLoading } =
  usePokemonCompareData(selectedIds);

 /**
  * Types filter
  */
 const { types } = usePokemonTypes();

 /**
  * Modal logic
  */
 const [isModalOpen, setIsModalOpen] = useState(false);

 /**
  * Toast side effects
  */
 useEffect(() => {
  if (error) {
   toast.error("Failed to fetch pokemons.", {
    description: error.message,
   });
  } else if (!loading && pokemons.length === 0) {
   toast.info("No pokemons found.", {
    description: "Try searching for another name.",
   });
  }
 }, [error, loading, pokemons.length]);

 return (
  <div className='p-6 space-y-6 max-w-4xl mx-auto min-h-screen relative'>
   {/* ================= SEARCH & HEADER ================= */}
   <div className='space-y-2'>
    <h1 className='text-2xl font-bold text-slate-900'>Pokedex Explorer</h1>
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
   <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl'>
    <div className='flex flex-wrap gap-2'>
     {types.map((type) => (
      <label
       key={type.id}
       className='flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border cursor-pointer hover:bg-slate-100 transition'
      >
       <input
        type='checkbox'
        className='rounded text-blue-600 focus:ring-blue-500'
        checked={selectedTypes.includes(type.name)}
        onChange={(e) => {
         if (e.target.checked) {
          updateTypes([...selectedTypes, type.name]);
         } else {
          updateTypes(selectedTypes.filter((t) => t !== type.name));
         }
        }}
       />
       <span className='capitalize text-sm font-medium'>{type.name}</span>
      </label>
     ))}
    </div>

    <div className='flex items-center gap-2'>
     <Select
      value={sortField}
      onValueChange={(value) =>
       updateSort(value as "id" | "name" | "height" | "weight", sortDirection)
      }
     >
      <SelectTrigger className='w-30 bg-white'>
       <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
       <SelectGroup>
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
      <SelectTrigger className='w-30 bg-white'>
       <SelectValue placeholder='Order' />
      </SelectTrigger>
      <SelectContent>
       <SelectGroup>
        <SelectItem value='asc'>Ascending</SelectItem>
        <SelectItem value='desc'>Descending</SelectItem>
       </SelectGroup>
      </SelectContent>
     </Select>
    </div>
   </div>

   {/* ================= LIST AREA ================= */}
   <div className='pb-32'>
    {" "}
    {/* Padding bottom agar tidak tertutup floating bar */}
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
     {loading
      ? Array.from({ length: limit }).map((_, i) => {
         return <Skeleton key={"" + i} className='h-44 w-full rounded-2xl' />;
        })
      : pokemons.map((pokemon) => {
         const selected = isSelected(pokemon.id);
         return (
          <div
           key={pokemon.id}
           className={`group relative p-6 border-2 rounded-2xl transition-all duration-300 shadow-sm 
                ${
                 selected
                  ? "border-blue-500 bg-blue-50/40 ring-4 ring-blue-50"
                  : "border-white bg-white hover:border-slate-200 hover:shadow-md"
                }`}
          >
           {/* Decorative Accent Line */}
           <div
            className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full transition-colors 
                ${selected ? "bg-blue-500" : "bg-slate-200"}`}
           />

           <div className='flex justify-between items-start'>
            <div>
             <p className='font-black text-xl capitalize text-slate-800 tracking-tight'>
              {pokemon.name}
             </p>
             <p className='text-xs font-bold text-slate-400 mt-1'>
              # {String(pokemon.id).padStart(3, "0")}
             </p>
            </div>
            <Image
             src={getPokemonImage(pokemon.id)}
             alt={pokemon.name}
             width={120}
             height={120}
            />
            {selected && (
             <div className='bg-blue-500 rounded-full p-1'>
              <Check size={12} className='text-white' />
             </div>
            )}
           </div>

           <div className='grid grid-cols-2 gap-4 mt-4 py-3 border-y border-slate-50'>
            <div>
             <p className='text-[10px] uppercase tracking-wider font-bold text-slate-400'>
              Height
             </p>
             <p className='font-semibold text-slate-700'>{pokemon.height}</p>
            </div>
            <div>
             <p className='text-[10px] uppercase tracking-wider font-bold text-slate-400'>
              Weight
             </p>
             <p className='font-semibold text-slate-700'>{pokemon.weight}</p>
            </div>
           </div>

           <div className='flex justify-center mt-5'>
            <Button
             variant={selected ? "default" : "outline"}
             className={`w-full rounded-xl transition-all font-bold ${
              selected
               ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
               : "hover:bg-slate-50"
             }`}
             onClick={() => toggleSelect(pokemon.id)}
             disabled={!selected && isMaxSelected}
            >
             {selected ? (
              <>
               <Check className='mr-2 h-4 w-4' /> Selected
              </>
             ) : (
              <>
               <Plus className='mr-2 h-4 w-4' /> Add to Compare
              </>
             )}
            </Button>
           </div>
          </div>
         );
        })}
    </div>
   </div>

   {/* ================= FLOATING COMPARE BAR ================= */}
   {!isModalOpen && selectedIds.length > 0 && (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50 animate-in fade-in slide-in-from-bottom-8 duration-500'>
     <div className='bg-slate-900/90 backdrop-blur-lg border border-slate-700 shadow-2xl p-4 rounded-2xl flex items-center justify-between'>
      <div className='flex items-center gap-4 pl-2'>
       <div className='relative'>
        <div className='bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black animate-pulse'>
         {selectedIds.length}
        </div>
       </div>
       <div>
        <p className='text-sm font-bold text-white leading-none'>
         Compare List
        </p>
        <p className='text-[11px] text-slate-400 mt-1'>
         {selectedIds.length === 1 ? "Select 1 more" : "Ready to compare!"}
        </p>
       </div>
      </div>

      <div className='flex items-center gap-2'>
       {/* BUTTON CANCEL / CLEAR */}
       <Button
        variant='ghost'
        onClick={() => {
         // Jika hook kamu tidak punya clearAll, kita toggle satu-satu
         selectedIds.forEach((id) => toggleSelect(id));
         toast.info("Selection cleared");
        }}
        className='text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl px-4 font-medium'
       >
        Cancel
       </Button>

       {/* BUTTON COMPARE */}
       <Button
        onClick={() => setIsModalOpen(true)}
        disabled={selectedIds.length < 2}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-6 py-6 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale'
       >
        Compare Now
       </Button>
      </div>
     </div>
    </div>
   )}

   {/* ================= COMPARE MODAL ================= */}
   <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <div className='p-2'>
     <h2 className='text-2xl font-black text-slate-800 mb-6 text-center'>
      Battle Comparison
     </h2>
     {compareLoading ? (
      <div className='flex flex-col items-center justify-center py-12 gap-4'>
       <Spinner className='h-8 w-8 text-blue-500' />
       <p className='text-slate-500 font-medium italic'>Analyzing stats...</p>
      </div>
     ) : (
      <div className='grid grid-cols-2 gap-4 md:gap-8'>
       {comparePokemons.map((pokemon) => (
        <div
         key={pokemon.id}
         className='bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner'
        >
         <p className='text-[10px] font-bold text-blue-500 uppercase'>
          #{pokemon.id}
         </p>
         <div className='flex justify-between'>
          <h2 className='text-2xl font-black capitalize text-slate-800 mb-4'>
           {pokemon.name}
          </h2>
          <Image
           src={getPokemonImage(pokemon.id)}
           alt={pokemon.name}
           width={120}
           height={120}
          />
         </div>

         <div className='space-y-3'>
          <div className='flex justify-between text-sm'>
           <span className='text-slate-500 font-medium'>Height</span>
           <span className='font-bold text-slate-700'>{pokemon.height}</span>
          </div>
          <div className='flex justify-between text-sm'>
           <span className='text-slate-500 font-medium'>Weight</span>
           <span className='font-bold text-slate-700'>{pokemon.weight}</span>
          </div>

          <div className='pt-4'>
           <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-3'>
            Base Stats
           </h3>
           <div className='space-y-2'>
            {pokemon.pokemonstats?.map((stat) => (
             <div key={stat.stat.name}>
              <div className='flex justify-between text-[11px] mb-1 font-bold uppercase'>
               <span className='text-slate-500'>{stat.stat.name}</span>
               <span className='text-blue-600'>{stat.base_stat}</span>
              </div>
              <div className='w-full bg-slate-200 h-1.5 rounded-full overflow-hidden'>
               <div
                className='bg-blue-500 h-full rounded-full transition-all duration-1000'
                style={{
                 width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                }}
               />
              </div>
             </div>
            ))}
           </div>
          </div>
         </div>
        </div>
       ))}
      </div>
     )}
    </div>
   </Modal>

   {/* ================= PAGINATION ================= */}
   {!error && pokemons.length > 0 && (
    <div className='flex justify-center pb-12'>
     <ButtonGroup className='bg-white shadow-md border rounded-2xl p-1'>
      <Button
       variant='ghost'
       size='icon'
       onClick={prevPage}
       disabled={offset === 0}
       className='rounded-xl h-12 w-12'
      >
       <ArrowLeftIcon className='h-5 w-5' />
      </Button>

      <div className='flex items-center px-4 font-bold text-slate-400 text-sm italic'>
       Page {Math.floor(offset / limit) + 1}
      </div>

      <Button
       variant='ghost'
       size='icon'
       onClick={nextPage}
       disabled={pokemons.length < limit}
       className='rounded-xl h-12 w-12'
      >
       <ArrowRightIcon className='h-5 w-5' />
      </Button>
     </ButtonGroup>
    </div>
   )}
  </div>
 );
}
