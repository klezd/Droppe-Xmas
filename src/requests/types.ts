export type _User = {
  id: number;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
};

export type _Cart = {
  id: number;
  userId: number;
  date: string;
  products: Array<_ProductInCart>;
};

export type _ProductInCart = {
  productId: number;
  quantity: number;
};

export type _Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
