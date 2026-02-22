"use client";

import React, { useContext, useEffect, useState } from "react";
import { getUserCart } from "@/CartActions/gerUserCart.action";
import { toast } from "sonner";
import { removeCartItem } from "@/CartActions/removeCartItem.action";
import { updateCartItem } from "@/CartActions/updateCartItem.action";
import { Button } from "@/components/ui/button";
import { removeCart } from "@/CartActions/removeCart.action";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { productCartType } from "@/type/cart.type";
import Image from "next/image";

export default function CartPage() {
  const [disableRemoveBtn, setDisableRemoveBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<productCartType[]>([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [disableUpdateBtn, setDisableUpdateBtn] = useState(false);
  const { count, setCount } = useContext(CartContext)!;
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");

  // ================= REMOVE PRODUCT =================
  async function removeProductFromCart(id: string) {
    setDisableRemoveBtn(true);
    setDisableUpdateBtn(true);

    const res = await removeCartItem(id);

    if (res.status === "success") {
      const updatedProducts = res.data.products;

      setProducts(updatedProducts);

      // حساب عدد المنتجات في الكارت
      let sum = 0;
      updatedProducts.forEach((prod: productCartType) => {
        sum += prod.count;
      });

      setCount(sum);

      toast.success("Product removed successfully", {
        duration: 3000,
        position: "top-center",
      });

      setDisableRemoveBtn(false);
      setDisableUpdateBtn(false);
      getUserCartProducts();
    } else {
      toast.error("Failed to remove product", {
        duration: 3000,
        position: "top-center",
      });

      setDisableRemoveBtn(false);
      setDisableUpdateBtn(false);
    }
  }

  // ================= GET CART =================
  async function getUserCartProducts() {
    const res = await getUserCart();

    if (res.status === "success") {
      setProducts(res.data.products);
      setTotalPrice(res.data.totalCartPrice);
      setCartId(res.data._id);

      let sum = 0;
      res.data.products.forEach((prod: productCartType) => {
        sum += prod.count;
      });

      setCount(sum);
    }

    setLoading(false);
  }

  // ================= UPDATE PRODUCT =================
  async function updateCartProduct(
    id: string,
    newCount: number
  ) {
    if (newCount < 1) return;

    setDisableRemoveBtn(true);
    setDisableUpdateBtn(true);
    setCurrentId(id);
    setUpdateLoading(true);

    const res = await updateCartItem(id, newCount);

    if (res.status === "success") {
      setProducts(res.data.products);
      setTotalPrice(res.data.totalCartPrice);

      let sum = 0;
      res.data.products.forEach((prod: productCartType) => {
        sum += prod.count;
      });

      setCount(sum);

      toast.success("Quantity updated successfully", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error("Failed to update quantity", {
        duration: 3000,
        position: "top-center",
      });
    }

    setUpdateLoading(false);
    setDisableRemoveBtn(false);
    setDisableUpdateBtn(false);
  }

  // ================= CLEAR CART =================
  async function removeAllCartProducts() {
    const res = await removeCart();

    if (res.message === "success") {
      setProducts([]);
      setCount(0);
      setTotalPrice(0);
    }
  }

  useEffect(() => {
    getUserCartProducts();
  }, []);

  // ================= UI =================
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold my-10">
        Your Cart is Empty
      </h1>
    );
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <h3 className="text-center my-4 text-2xl text-red-500">
        Total Price = ${totalPrice}
      </h3>

      <Button
        className="my-4 bg-red-700"
        onClick={removeAllCartProducts}
      >
        Clear Cart
      </Button>

      <div className="overflow-x-auto shadow rounded border">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <tr key={prod.product.id} className="border-b">
                <td className="p-4">
                  <Image
                    width={100}
                    height={100}
                    src={prod.product.imageCover}
                    alt={prod.product.title}
                  />
                </td>

                <td className="px-6 py-4 font-semibold">
                  {prod.product.title}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={disableUpdateBtn}
                      onClick={() =>
                        updateCartProduct(
                          prod.product.id,
                          prod.count - 1
                        )
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    {currentId === prod.product.id && updateLoading ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <span>{prod.count}</span>
                    )}

                    <button
                      disabled={disableUpdateBtn}
                      onClick={() =>
                        updateCartProduct(
                          prod.product.id,
                          prod.count + 1
                        )
                      }
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${prod.price * prod.count}
                </td>

                <td className="px-6 py-4">
                  <button
                    disabled={disableRemoveBtn}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      removeProductFromCart(prod.product.id)
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button className="text-white bg-green-500 rounded p-2 my-6 block ms-auto">
        <Link href={`/checkout/${cartId}`}>Check Out</Link>
      </Button>
    </div>
  );
}