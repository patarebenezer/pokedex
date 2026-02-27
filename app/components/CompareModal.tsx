import { Modal } from "@/app/components/Modal";
import { Spinner } from "@/components/ui/spinner";
import { PokemonImage } from "@/features/pokemon/components/PokemonImage";
import { MODAL_TITLE } from "@/shared/constant";
import { CompareModalProps } from "@/features/pokemon/types";
import PokemonStats from "@/features/pokemon/components/PokemonStats";

export default function CompareModal({
 isOpen,
 onClose,
 pokemons,
 loading,
}: Readonly<CompareModalProps>) {
 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <div className='p-2'>
    <h2 className='text-2xl font-black text-slate-800 mb-6 text-center'>
     {MODAL_TITLE}
    </h2>
    {loading ? (
     <div className='flex flex-col items-center justify-center py-12 gap-4'>
      <Spinner className='h-8 w-8 text-blue-500' />
      <p className='text-slate-500 font-medium italic'>Analyzing stats...</p>
     </div>
    ) : (
     <div className='grid grid-cols-2 gap-4 md:gap-8'>
      {pokemons.map((pokemon) => (
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
         <PokemonImage id={pokemon.id} name={pokemon.name} />
        </div>

        <PokemonStats stats={pokemon.pokemonstats} pokemon={pokemon} />
       </div>
      ))}
     </div>
    )}
   </div>
  </Modal>
 );
}
