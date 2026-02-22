 export interface CartProduct  {
  count: number;
  product: {
    _id: string;
    title: string;
    price: number;
    imageCover: string;
  };
};