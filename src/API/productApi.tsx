import axios from "axios";
import { ProductDTO, CreateProductDTO } from "../types/ProductDTO";

const BASE_URL = "http://localhost:8080/api/products";

export const fetchProducts = async (): Promise<ProductDTO[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createProduct = async (
  product: CreateProductDTO
): Promise<ProductDTO> => {
  const res = await axios.post(BASE_URL, product);
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: CreateProductDTO
): Promise<ProductDTO> => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
