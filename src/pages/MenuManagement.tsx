import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../API/productApi";
import { fetchCategories } from "../API/categoryApi";

import { ProductDTO, CreateProductDTO } from "../types/ProductDTO";
import { Category } from "../types/CategoryDTO";

export default function MenuManagement() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<ProductDTO>>({});

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing.name || !editing.price || !editing.categoryId) return;

    const payload: CreateProductDTO = {
      name: editing.name,
      price: editing.price,
      categoryId: editing.categoryId,
    };

    if (editing.id) {
      await updateProduct(editing.id, payload);
    } else {
      await createProduct(payload);
    }

    setEditing({});
    loadProducts();
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý Menu</h1>

     
      <form
        onSubmit={handleSubmit}
        className="mb-4 flex gap-4 items-end flex-wrap"
      >
        <input
          type="text"
          className="border p-2 rounded w-[200px]"
          placeholder="Tên món"
          value={editing.name || ""}
          onChange={(e) => setEditing({ ...editing, name: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 rounded w-[120px]"
          placeholder="Giá"
          value={editing.price || ""}
          onChange={(e) =>
            setEditing({
              ...editing,
              price: Number(e.target.value),
            })
          }
        />

      
        <select
          className="border p-2 rounded w-[180px]"
          value={editing.categoryId || ""}
          onChange={(e) =>
            setEditing({
              ...editing,
              categoryId: Number(e.target.value),
            })
          }
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.length === 0 ? (
            <option disabled>(Không có danh mục)</option>
          ) : (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing?.id ? "Cập nhật" : "Thêm"}
        </button>
      </form>

     
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tên món</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price.toLocaleString()}đ</td>
              <td className="p-2 border space-x-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => setEditing(p)}
                >
                  Sửa
                </button>
                <button
                  className="text-red-600 underline"
                  onClick={() => handleDelete(p.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
