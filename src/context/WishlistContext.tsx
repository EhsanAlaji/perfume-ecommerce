"use client"

import { getUserCart } from "@/CartActions/gerUserCart.action";
import { Wishlist } from "@/type/wishlist.type";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";



// 1️⃣ Define Context Type
export type wishlistContextType = {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
};


// 2️⃣ Create Context with default value
export const wishlistContext = createContext<wishlistContextType>({
  count: 0,
  setCount: () => {},
});


// 3️⃣ Define Props Type
type CartProviderProps = {
  children: ReactNode;
};


export function WishlistContextProvider({ children }: CartProviderProps) {
  const [count, setCount] = useState<number>(0);

  async function getLoggedUserWishlistCount() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        let sum = 0;

        res.data?.products.forEach((item: Wishlist) => {
          sum += item.count;
        });

        setCount(sum);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getLoggedUserWishlistCount();
  }, []);

  return (
    <wishlistContext.Provider value={{ count, setCount }}>
      {children}
    </wishlistContext.Provider>
  );
}
