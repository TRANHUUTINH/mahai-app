import { ProductDTO } from "../types/ProductDTO";

export function printBill(items: ProductDTO[]) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const time = new Date().toLocaleString();

  const lines = [
    "Cơm tấm má hai xin chào",
    "====== HOÁ ĐƠN ======",
    `Thời gian: ${time}`,
    "----------------------",

    ...items.map((item) => `${item.name} - ${item.price.toLocaleString()}đ`),
    "----------------------",
    `TỔNG: ${total.toLocaleString()}đ`,
    "Cảm ơn quý khách!",
    "======================",
  ];

  const text = lines.join("\n");

  const billWindow = window.open("", "Hoá đơn", "width=400,height=600");
  if (billWindow) {
    billWindow.document.write(`<pre>${text}</pre>`);
    billWindow.document.close();
    billWindow.print();
  }
}
