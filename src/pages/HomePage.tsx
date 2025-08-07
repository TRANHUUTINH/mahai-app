import { useEffect, useState } from "react";
import { fetchProducts } from "../API/productApi";
import { fetchCategories } from "../API/categoryApi";
import { ProductDTO } from "../types/ProductDTO";
import { Category } from "../types/CategoryDTO";
import MenuItemCard from "../components/MenuItemCard";
import Bill from "../components/Bill";
import ConfirmModal from "../components/ConfirmModal";
import { printBill } from "../utils/printUtils";

export default function HomePage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedItems, setSelectedItems] = useState<ProductDTO[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  
  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCategories().then(setCategories);
  }, []);

  
  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.categoryId === selectedCategoryId)
    : products;

  const addToBill = (product: ProductDTO) => {
    setSelectedItems((prev) => [...prev, product]);
  };

  const removeFromBill = (id: number) => {
    setSelectedItems((prev) => prev.filter((item, index) => index !== id));
  };

  const handlePrint = () => {
    printBill(selectedItems);
    setSelectedItems([]);
    setShowConfirm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>

      {/* Tabs danh mục */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded border ${
            selectedCategoryId === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategoryId(null)}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded border ${
              selectedCategoryId === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <MenuItemCard key={product.id} product={product} onAdd={addToBill} />
        ))}
      </div>

     
      <Bill selectedItems={selectedItems} onRemoveItem={removeFromBill} />

    
      {selectedItems.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            In hoá đơn
          </button>
        </div>
      )}

      <ConfirmModal
        show={showConfirm}
        onConfirm={handlePrint}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
