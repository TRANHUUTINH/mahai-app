import axios from "axios";
import { Category } from "../types/CategoryDTO";
import { ProductDTO } from "../types/ProductDTO";

const BASE_API_URL = "https://mahai-app-service-production.up.railway.app/api";


export const fetchCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${BASE_API_URL}/categories`);
  return res.data;
};

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<ProductDTO[]> => {
  const res = await axios.get(
    `${BASE_API_URL}/products/category/${categoryId}`
  );
  return res.data;
};
