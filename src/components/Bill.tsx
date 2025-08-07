import { ProductDTO } from "../types/ProductDTO";

interface BillProps {
  selectedItems: ProductDTO[];
  onRemoveItem: (id: number) => void;
}

export default function Bill({ selectedItems, onRemoveItem }: BillProps) {
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white shadow p-4 rounded mt-4">
      <h2 className="text-lg font-bold mb-2">Hoá đơn tạm tính</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-1">
            <span>
              {item.name} - {item.price.toLocaleString()}đ
            </span>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="text-red-500 ml-2 font-bold hover:text-red-700"
              title="Xoá món"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold">Tổng cộng: {total.toLocaleString()}đ</p>
    </div>
  );
}
