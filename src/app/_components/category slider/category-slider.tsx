import getAllCategories from '@/api/getAllCategories';
import MySlider from '@/components/myslider/myslider';
import { Category } from '@/type/category.type';
import { get } from 'http'
import React from 'react'

export default async function CategorySlider({categories}:{categories:Category[]}) {
    const data = await getAllCategories();

    const dataimage=data.map((ca:Category)=>ca.image);
  return<>
  <div className=' w-[80%] mx-auto mt-5 mb-5'>
<MySlider imgList={dataimage}  slidesPerView={7} />
  </div>
  
  
  </>
}
