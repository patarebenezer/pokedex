import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function Pagination({
 offset,
 limit,
 itemLength,
 prevPage,
 nextPage,
}: Readonly<{
 offset: number;
 limit: number;
 prevPage: () => void;
 nextPage: () => void;
 itemLength: number;
}>) {
 return (
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

    <div className='flex items-center px-2 font-medium text-slate-400 text-sm'>
     Page {Math.floor(offset / limit) + 1}
    </div>

    <Button
     variant='ghost'
     size='icon'
     onClick={nextPage}
     disabled={itemLength < limit}
     className='rounded-xl h-12 w-12'
    >
     <ArrowRightIcon className='h-5 w-5' />
    </Button>
   </ButtonGroup>
  </div>
 );
}
