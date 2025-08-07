import { ProductDTO } from "../types/ProductDTO";

interface Props {
  item: ProductDTO;
  onAdd: (item: ProductDTO) => void;
}

export default function MenuItemCard({ item, onAdd }: Props) {
  return (
    <div className="border p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{item.name}</h3>
        <p>{item.price.toLocaleString()}đ</p>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        onClick={() => onAdd(item)}
      >
        +
      </button>
    </div>
  );
}
