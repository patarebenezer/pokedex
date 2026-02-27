import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonImage } from "@/shared/getPokemonImage";

export const PokemonImage = ({ id, name }: { id: number; name: string }) => {
 const [isLoading, setIsLoading] = useState(true);

 console.log("isLoading", isLoading);
 return (
  <div className='relative flex justify-end'>
   {isLoading && (
    <Skeleton className='absolute inset-0 w-full h-full rounded-full animate-pulse bg-slate-200' />
   )}

   <Image
    src={getPokemonImage(id)}
    alt={name}
    width={120}
    height={120}
    className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
    onLoadingComplete={() => setIsLoading(false)}
   />
  </div>
 );
};
