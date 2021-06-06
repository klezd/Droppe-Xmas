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
  userName?: string;
  date: string;
  products: Array<_ProductInCart>;
};

export type _UserWithCarts = IAMap<_Cart>;

export type _UserWithCart = IMap<_Cart>;

export type _ProductInCart = {
  productId: number;
  quantity: number;
  productInfo?: _ProductShort;
};

export type _Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type _ProductShort = {
  title: string;
  price: number;
  image: string;
};

export interface IAMap<TValue> {
  [id: string]: Array<TValue>;
}

export interface IMap<TValue> {
  [id: string]: TValue;
}
