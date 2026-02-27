import { Pokemon } from "@/features/pokemon/types";

export default function PokemonStats({
 stats,
 pokemon,
}: Readonly<{ stats: Pokemon["pokemonstats"]; pokemon: Pokemon }>) {
 return (
  <div className='space-y-3'>
   <PhysicalBox label='Height' value={pokemon.height} />
   <PhysicalBox label='Weight' value={pokemon.weight} />

   <div className='pt-4'>
    <h3 className='text-xs font-black text-slate-400 uppercase tracking-widest mb-3'>
     Base Stats
    </h3>
    <div className='space-y-2'>
     {stats?.map((stat) => (
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
 );
}

const PhysicalBox = ({ label, value }: { label: string; value: number }) => (
 <div>
  <div className='flex justify-between text-sm'>
   <span className='text-slate-500 font-medium'>{label}</span>
   <span className='font-bold text-slate-700'>{value}</span>
  </div>
 </div>
);
