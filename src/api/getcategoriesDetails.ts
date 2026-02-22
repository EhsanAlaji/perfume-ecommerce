export default async function getcategoriesDetails(id:string){
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`,{

    method:"GET"
  })

  const data = await res.json();
  console.log(data);

  return data;
  

} 