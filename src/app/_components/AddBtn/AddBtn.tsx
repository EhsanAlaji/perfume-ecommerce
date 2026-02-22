"use client"
import { addToCart } from '@/CartActions/addToCart.action';
import { Button } from '@/components/ui/button'
import {CartContext} from '@/context/CartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner';

export default function AddBtn({ id }: { id: string }) {
  const { count, setCount } = useContext(CartContext);

async function addToCartHandler(id: string) {
  try {
    const res = await addToCart(id);

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

          addToCartHandler(id);
        }}
        className="bg-blue-500 w-full text-white mt-6 py-3 rounded-lg 
        hover:bg-blue-600 transition"
      >
        <i className="fa-solid fa-plus text-yellow-400 mr-2"></i>
        Add to Cart
      </Button>
    </div>
  )
}
