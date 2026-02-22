export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string; // الآن optional
  updatedAt?: string; // الآن optional
}