export type TProduct = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  discount: number | null;
  discountedPrice: number;
  isNew: boolean;
  popular: boolean;
  sizes: string[];
  colors: string[];
};

export type TProductDB = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  discount: number | null;
  discounted_price: number;
  is_new: boolean;
  popular: boolean;
  sizes: string[];
  colors: string[];
};
