"use client"

import React, { useContext, useEffect, useState } from 'react'



import { toast } from 'sonner';
import { removewishlistItem } from '@/WishlistActions/removewishlistItem.action';



import { CartContext } from '@/context/CartContext';

import { getUserWishlist } from '@/WishlistActions/getUserwishlist.action';
import {  WishlistTpye } from '@/type/wishlist.type';

export default function Wishlist() {
  const [DisableFlay, setDisableFlay] = useState(false); // disable remove button 
    const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState<WishlistTpye[]>([]);
  const [updateLoading, setupdateLoading] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [disableUpdateBtn, setdisableUpdateBtn] = useState(false);
  const { count, setCount } = useContext(CartContext)!
  const [TotalPrice, setTotalPrice] = useState(0);
  const [cartid, setcartid] = useState("");
  async function removewishlistItemproduct(id:string){  
    setDisableFlay(true);
    setdisableUpdateBtn(true);
    const res=await removewishlistItem(id);
    console.log(res);
    if(res.status=="success"){
      setproducts(res.data.products);
      toast.success("product removed form wishlist successfully", {
        duration: 2000,
        position: "top-center"
    });
      setproducts(res.data.products);
      setDisableFlay(false);
      setdisableUpdateBtn(false);
      getUserWishlistProducts();
   
    }
    else{
      toast.error("Failed to remove product from cart", {
        duration: 3000,
        position: "top-center"
    });
setdisableUpdateBtn(false);
    
    }
  }

async function getUserWishlistProducts() {
  const res = await getUserWishlist();

  if (res.status === "success") {
    setproducts(res.data);
    setLoading(false);
  } else {
    setLoading(false);
  }
}




  useEffect(()=>{
   function flag(){
     setLoading(true);
    getUserWishlistProducts();
   }
    flag()
  },[])
  return<>
  {loading ? <h1 className='text-center text-red-700'>Looooading............</h1> : products?.length > 0 ? 
   <div className=' container mx-auto my-10'>

  <h1 className='text-2xl font-bold mb-6' >Wish List </h1>

  
  
  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                Price
                </th>
                

            </tr>
        </thead>
    <tbody>
  {products?.map((prod:WishlistTpye) => {
    return (
      <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        
        <td className="p-4">
          <img src={prod.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={prod.title}/>
        </td>

        <td className="px-6 py-4 font-semibold text-heading">
          {prod.title}
        </td>

        <td className="px-6 py-4 font-semibold text-heading">
          ${prod.price}
        </td>

        <td>
          <button
            className="bg-red-500 w-full text-white mt-6 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => removewishlistItemproduct(prod._id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
    </table>
    
</div>

  </div>: <h1 className='text-center text-2xl font-bold my-10'>Your wishlist is  empty</h1>
  
  }

  
  </>
}
