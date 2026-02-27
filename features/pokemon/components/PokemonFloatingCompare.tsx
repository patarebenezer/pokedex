import { CompareFloatingBarProps } from "@/features/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PokemonFloatingCompare({
 selectedIds,
 onToggle,
 onCompare,
}: Readonly<CompareFloatingBarProps>) {
 return (
  <div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-50 animate-in fade-in slide-in-from-bottom-8 duration-500'>
   <div className='bg-slate-900/90 backdrop-blur-lg border border-slate-700 shadow-2xl p-4 rounded-2xl flex items-center justify-between'>
    <div className='flex items-center gap-4 pl-2'>
     <div className='relative'>
      <div className='bg-blue-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-black animate-pulse'>
       {selectedIds.length}
      </div>
     </div>
     <div>
      <p className='text-sm font-bold text-white leading-none'>Compare List</p>
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
       selectedIds.forEach((id) => onToggle(id));
       toast.info("Selection cleared");
      }}
      className='text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl px-4 font-medium'
     >
      Cancel
     </Button>

     {/* BUTTON COMPARE */}
     <Button
      onClick={() => onCompare()}
      disabled={selectedIds.length < 2}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-6 py-6 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale'
     >
      Compare Now
     </Button>
    </div>
   </div>
  </div>
 );
}
