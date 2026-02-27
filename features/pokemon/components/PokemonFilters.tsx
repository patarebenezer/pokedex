import {
 SelectTrigger,
 SelectValue,
 SelectContent,
 SelectGroup,
 SelectItem,
 Select,
} from "@/components/ui/select";
import { usePokemonTypes } from "@/features/pokemon/hooks/usePokemonTypes";
import { PokemonFiltersProps } from "@/features/pokemon/types";
import { itemsOption } from "@/shared/getPokemonImage";

export default function PokemonFilters({
 selectedTypes,
 toggleType,
 sortField,
 sortDirection,
 updateSort,
}: Readonly<PokemonFiltersProps>) {
 const { types } = usePokemonTypes();

 return (
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
       onChange={() => toggleType(type.name)}
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
 );
}
