export interface Product {
  id: string
  productName: string
  price: number
  quantidade: number
  total: number
}

export interface ShoppingList {
  id: string;
  name: string;
  maxValue: number;
  createdAt?: Date;
  productsList: Product[]
  total: number
}

export interface CreateListData {
  name: string;
  maxValue: number;
}

export interface UpdateListData {
  id: string;
  name: string;
  maxValue: number;
}