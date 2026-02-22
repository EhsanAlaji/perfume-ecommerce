
import Image from 'next/image';
import getCategories from '@/api/getcategories';
import { Category } from '@/type/category.type';

import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Categories() {

  const data: Category[] = await getCategories();

  return (
    <div className='container mx-auto my-4 md:w-[80%] w-full'>
      <div className="flex flex-wrap">

        {data?.map((category: Category) => (
          <div
            key={category._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            
              <div className='px-2 bg-white shadow-md p-3 rounded-3xl'>

                <CardContent>
                  <p className='font-bold line-clamp-1'>
                    {category.name}
                  </p>
                </CardContent>

                <CardHeader>
                  <CardTitle>
                    <Image
                      width={200}
                      height={200}
                      className='w-full'
                      src={category.image}
                      alt={category.name}
                    />
                  </CardTitle>
                </CardHeader>

              </div>
            
          </div>
        ))}

      </div>
    </div>
  );
}