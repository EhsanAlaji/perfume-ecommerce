import getProductDetails from '@/api/getDetail';
import AddBtn from '@/app/_components/AddBtn/AddBtn';


import AddBtnWishlist from '@/app/_components/AddBtnWishlist';

export default async function Details({params}:{params:Promise<{details:string}>}) {

  const {details}=await params;

const data = await getProductDetails(details);
if(!data) return <h1>no product details here</h1>
// console.log(details.data.category.name);
const res = await getRelatedProducts(data.data?.category?._id);
  return<>
<div className="container mx-auto my-8 md:w-[80%] 
flex flex-col md:flex-row items-center gap-6">

  {/* Right Side - Image */}    
  <div className="rightSide w-full md:w-1/2">
      <h2 className=" block sm:hidden text-xl md:text-2xl  font-bold ">
      {data.data.title}
    </h2>
    <img
      src={data.data.imageCover}
      className="w-full max-h-[300px] object-contain mx-auto"
      alt="Product Image"
    />
  </div>

  {/* Left Side - Content */}
  <div className="leftSide w-full md:w-1/2 text-center md:text-left">
    <h2 className="hidden sm:block text-xl md:text-2xl font-bold">
      {data.data?.title}
    </h2>

    <p className="text-sm md:text-lg my-2 opacity-60">
      {data.data.description}
    </p>

    <p className="text-sm md:text-base font-medium">
      {data.data.category.name}
    </p>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-3">
      <p className="font-bold text-lg md:text-xl">
        {data.data.price} EGP
      </p>

      <p className="flex items-center justify-center md:justify-start gap-1">
        <i className="fa-solid fa-star text-yellow-400"></i>
        {data.data.ratingsAverage}
      </p>
    </div>

    <AddBtn  id={data.data._id}/>
    <AddBtnWishlist id={data.data._id}/>
  </div>
</div>

{/* <div className="container w-[80%] mx-auto flex my-3">
  <div className="flex flex-wrap">

    {res.data.map((prod:product)=>{
     return  <Product product={prod} key={prod._id} />
    })}
  </div>


</div> */}


  </>
}
