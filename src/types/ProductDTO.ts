export interface ProductDTO {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  categoryId: number;
}