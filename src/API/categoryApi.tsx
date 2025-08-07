import axios from "axios";
import { Category } from "../types/CategoryDTO";
import { ProductDTO } from "../types/ProductDTO";

const BASE_URL = "http://localhost:8080/api/categories";

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<ProductDTO[]> => {
  const res = await axios.get(
    `http://localhost:8080/api/products/category/${categoryId}`
  );
  return res.data;
};
