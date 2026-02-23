"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getMyToken(){

    const decodeToken =(await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__Secure-next-auth.session-token")?.value


        if(!decodeToken) return null;

       const token = await decode({
  token: decodeToken,
  secret: process.env.NEXTAUTH_SECRET!,
});
        


       console.log( token?.token)
    return token?.token;
}

// "use server"

// import { getToken } from "next-auth/jwt";
// import { headers } from "next/headers";

// export async function getMyToken() {
//   const token = await getToken({
//     req: {
//       headers: {
//         cookie: headers().get("cookie") ?? "",
//       },
//     } as any,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   return token?.token ?? null;
// }