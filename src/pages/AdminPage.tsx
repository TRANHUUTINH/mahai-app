import { useEffect, useState } from "react";
import { ProductDTO, CreateProductDTO } from "../types/ProductDTO";
import { Category } from "../types/CategoryDTO";
import { fetchProducts, createProduct, deleteProduct } from "../API/productApi";
import { fetchCategories } from "../API/categoryApi";

export default function AdminPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<CreateProductDTO>({
    name: "",
    price: 0,
    categoryId: 0,
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
    if (data.length > 0)
      setForm((prev) => ({ ...prev, categoryId: data[0].id }));
  };

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.categoryId) return;
    await createProduct(form);
    setForm({ name: "", price: 0, categoryId: categories[0]?.id || 0 });
    loadProducts();
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠️ Quản lý món ăn</h1>

      <div className="space-y-2 mb-6">
        <input
          className="border px-3 py-2 w-full"
          placeholder="Tên món"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-3 py-2 w-full"
          type="number"
          placeholder="Giá"
          value={form.price || ""}
          onChange={(e) => setForm({ ...form, price: +e.target.value })}
        />
        <select
          className="border px-3 py-2 w-full"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: +e.target.value })}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAdd}
        >
          ➕ Thêm món
        </button>
      </div>

      <ul className="space-y-2">
        {products.map((item) => {
          const categoryName =
            categories.find((c) => c.id === item.categoryId)?.name ||
            "Không rõ";
          return (
            <li
              key={item.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                <strong>{item.name}</strong> - {item.price.toLocaleString()}đ{" "}
                <em>({categoryName})</em>
              </span>
              <button
                className="text-red-500"
                onClick={() => handleDelete(item.id)}
              >
                ❌
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
