import { memo } from "react";
import { PokemonImage } from "@/features/pokemon/components/PokemonImage";
import { Button } from "@/components/ui/button";
import { PokemonCardProps } from "@/features/pokemon/types";
import { Check, Plus } from "lucide-react";

const PokemonCard = memo(function PokemonCard({
 pokemon,
 isSelected,
 isMaxSelected,
 onToggle,
}: Readonly<PokemonCardProps>) {
 return (
  <div
   className={`group relative p-6 border-2 rounded-2xl transition-all duration-300 shadow-sm 
                ${
                 isSelected
                  ? "border-blue-500 bg-blue-50/40 ring-4 ring-blue-50"
                  : "border-white bg-white hover:border-slate-200 hover:shadow-md"
                }`}
  >
   <div
    className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full transition-colors 
                ${isSelected ? "bg-blue-500" : "bg-slate-200"}`}
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

    <PokemonImage id={pokemon.id} name={pokemon.name} />

    {isSelected && (
     <div className='bg-blue-500 rounded-full p-1'>
      <Check size={12} className='text-white' />
     </div>
    )}
   </div>

   <div className='grid grid-cols-2 gap-4 mt-4 py-3 border-y border-slate-50'>
    <StatBox label='Height' value={pokemon.height} />
    <StatBox label='Weight' value={pokemon.weight} />
   </div>

   <div className='flex justify-center mt-5'>
    <Button
     variant={isSelected ? "default" : "outline"}
     className={`w-full rounded-xl transition-all font-bold ${
      isSelected
       ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
       : "hover:bg-slate-50"
     }`}
     onClick={() => onToggle(pokemon.id)}
     disabled={!isSelected && isMaxSelected}
    >
     {isSelected ? (
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
});

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;

const StatBox = ({ label, value }: { label: string; value: number }) => (
 <div>
  <p className='text-[10px] uppercase tracking-wider font-bold text-slate-400'>
   {label}
  </p>
  <p className='font-semibold text-slate-700'>{value}</p>
 </div>
);
