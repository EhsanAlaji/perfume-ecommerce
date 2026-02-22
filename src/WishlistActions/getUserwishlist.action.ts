"use server"
import { getMyToken } from "@/utilities/getMyToken";


export async function getUserWishlist(){

    const token = await getMyToken();
    if(!token) throw new Error("you should logged in first");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token
        }
    })

    const payload = await res.json();

    return payload;
}