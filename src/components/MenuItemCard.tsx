import { ProductDTO } from "../types/ProductDTO";

interface Props {
  product: ProductDTO;
  onAdd: (product: ProductDTO) => void;
}

export default function MenuItemCard({ product, onAdd }: Props) {
  return (
    <div
      className="border rounded p-4 shadow hover:bg-gray-100 cursor-pointer"
      onClick={() => onAdd(product)}
    >
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-700">{product.price.toLocaleString()}₫</p>
    </div>
  );
}
