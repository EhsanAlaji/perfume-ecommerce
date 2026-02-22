"use client"

import { getUserCart } from "@/CartActions/gerUserCart.action";
import { CartProduct } from "@/type/cartProduct.type";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";


// 1️⃣ Define Context Type
export type wishlistContextType = {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
};


// 2️⃣ Create Context with default value
export const CartContext = createContext<wishlistContextType>({
  count: 0,
  setCount: () => {},
});


// 3️⃣ Define Props Type
type cartProviderProps = {
  children: ReactNode;
};


export function CartContextProvider({ children }: cartProviderProps) {
  const [count, setCount] = useState<number>(0);

  async function getLoggedUsercartCount() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        let sum = 0;

        res.data?.products.forEach((item:CartProduct) => {
          sum += item.count;
        });

        setCount(sum);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    function flag(){
getLoggedUsercartCount();
    }
    flag()
  }, []);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
}
