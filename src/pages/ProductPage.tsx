import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../API/productApi";
import { ProductDTO, CreateProductDTO } from "../types/ProductDTO";
import { Category } from "../types/CategoryDTO";
import { printBill } from "../utils/printUtils";

export default function ProductManagerPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<ProductDTO[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newProduct, setNewProduct] = useState<CreateProductDTO>({
    name: "",
    price: 0,
    categoryId: 0,
  });

  useEffect(() => {
    const load = async () => {
      const productRes = await fetchProducts();
      setProducts(productRes);

      const categoryRes = await fetchProducts();
      setCategories(categoryRes);
    };

    load();
  }, []);

  const handleProductSelect = (product: ProductDTO) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handlePrint = () => {
    if (selectedProducts.length === 0) {
      alert("Chưa chọn sản phẩm nào!");
      return;
    }
    printBill(selectedProducts);
    setSelectedProducts([]);
  };

  const handleSubmit = async () => {
    if (
      newProduct.name.trim() === "" ||
      newProduct.price <= 0 ||
      newProduct.categoryId === 0
    ) {
      alert("Vui lòng nhập đầy đủ và hợp lệ!");
      return;
    }

    if (editingId !== null) {
      const updated: ProductDTO = {
        id: editingId,
        ...newProduct,
      };
      await updateProduct(editingId, updated);
      setEditingId(null);
    } else {
      await createProduct(newProduct);
    }

    setNewProduct({ name: "", price: 0, categoryId: 0 });
    const updatedList = await fetchProducts();
    setProducts(updatedList);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xoá?")) {
      await deleteProduct(id);
      const updatedList = await fetchProducts();
      setProducts(updatedList);
    }
  };

  const handleEdit = (product: ProductDTO) => {
    setEditingId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
    });
  };

  const filteredProducts = products.filter(
    (p) => p.categoryId === selectedCategoryId
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h1>

      <div className="flex gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded border ${
              selectedCategoryId === cat.id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
            onClick={() => setSelectedCategoryId(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => handleProductSelect(p)}
          >
            <div className="font-medium">{p.name}</div>
            <div>{p.price.toLocaleString()}đ</div>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="border p-4 mb-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Sản phẩm đã chọn:</h2>
          <ul className="list-disc ml-5">
            {selectedProducts.map((p, i) => (
              <li key={i}>
                {p.name} - {p.price.toLocaleString()}đ
              </li>
            ))}
          </ul>
          <button
            onClick={handlePrint}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            Xác nhận & In
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h2>
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 rounded w-1/3"
            type="text"
            placeholder="Tên sản phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-1/4"
            type="number"
            placeholder="Giá"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <select
            className="border p-2 rounded w-1/3"
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                categoryId: Number(e.target.value),
              })
            }
          >
            <option value={0}>-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Cập nhật" : "Thêm"}
          </button>
        </div>

        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Danh mục</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const category = categories.find((c) => c.id === p.categoryId);
              return (
                <tr key={p.id}>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.price.toLocaleString()}đ</td>
                  <td className="border p-2">{category?.name || "Không rõ"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-500 mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
