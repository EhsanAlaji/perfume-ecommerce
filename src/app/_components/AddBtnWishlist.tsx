"use client"

import { Button } from '@/components/ui/button'

import { wishlistContext } from '@/context/WishlistContext';
import { addToWishlist } from '@/WishlistActions/addToWishlist.action';
import React, { useContext } from 'react'
import { toast } from 'sonner';

export default function AddBtnWishlist({ id }: { id: string }) {
  const { count, setCount } = useContext(wishlistContext);

async function addToWishHandler(id: string) {
  try {
    const res = await addToWishlist(id);

    if (res?.status === "success") {
      toast.success(res.message);
      setCount(prev => prev + 1);
    } else {
      toast.error(res?.message  , {
  position: "top-center",
  duration: 3000,
}
      );
    }

  } catch (error) {
    toast.error("You must login first");
  }
}


  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();    // يمنع الـ Link
          e.stopPropagation();   // يمنع الحدث يوصل للكارد

          addToWishHandler(id);
        }}
        className="bg-blue-500 w-full text-white mt-2 py-3 rounded-lg 
        hover:bg-blue-600 transition"
      >
        <i className='fa-regular fa-heart'></i>
        Add to wishlist
      </Button>
    </div>
  )
}
