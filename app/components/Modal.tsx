"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: Readonly<ModalProps>) {
 if (!isOpen) return null;

 return (
  <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
   <div className='bg-gray-100 rounded-lg p-10 w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-8 duration-500 '>
    <button onClick={onClose} className='absolute top-2 right-2 cursor-pointer'>
     <X />
    </button>
    {children}
   </div>
  </div>
 );
}
