// export default async function getCategories() {
// const response=await fetch(`https://ecommerce.routemisr.com/api/v1/categories` , {method:"GET"})
// const {data}=await response.json();

import { Category } from "@/type/cart.type";

// return data;
// }

// api/getcategories.ts
// export default async function getCategories(): Promise<Category[]> {
//   try {
//     const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");

//     if (!res.ok) {
//       console.error("Failed to fetch categories:", res.statusText);
//       return [];
//     }

//     const data = await res.json();
//     return data?.data || []; // fallback Array فارغ
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }



export default async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
    const json = await res.json();

    return (json.data || []).map((cat: Category) => ({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      image: cat.image,
   
    }));
  } catch (err) {
    console.error('Failed to fetch categories:', err);
    return [];
  }
}