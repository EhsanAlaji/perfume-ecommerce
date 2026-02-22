import Image from "next/image";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MainSlider from "./_components/MainSlider/MainSlider";
import product from "./product/page";
import CategorySlider from "./_components/category slider/category-slider";
import details from "./product/[details]/page";
import Product from "./product/page";

export default function Home() {
  return <>

  <MainSlider />
  <CategorySlider/>
  <Product/>
  
  </>;
}
