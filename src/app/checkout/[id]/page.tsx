"use client";
import { removeCart } from "@/CartActions/removeCart.action";
import { checkPayment } from "@/checkoutActions/checkout.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { checkoutshema, checkoutshemaType } from "@/shema/checkout.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function Checkout() {
const {id} : {id : string}= useParams()
console.log(id);
  
  const router = useRouter();

  const form = useForm <checkoutshemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city:"",
    },
    resolver: zodResolver(checkoutshema),
  });
  const { handleSubmit } = form;
  async function handlecheckout(values:checkoutshemaType) {
   
    const res= await checkPayment(id  , values )
      console.log(res);
      router.push(res.session.url)

  }
  return (
    <>
      <div className="w-[50%] mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">CheckOut</h2>

        <form onSubmit={handleSubmit(handlecheckout)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    details :::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email please"
                    autoComplete="on"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    phone ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password please"
                    autoComplete="on"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
                  <FieldGroup>
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-email">
                    city ::::
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password please"
                    autoComplete="on"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button className="w-full my-3" type="submit">
            pay visa now 
          </Button>
          <Button className="w-full my-3 bg-blue-600 hover:bg-blue-700"  onClick={()=>{removeCart() }}><Link href="/allorders">pay cash now </Link></Button>
        </form>
      </div>
    </>
  );
}
