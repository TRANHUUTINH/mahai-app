type ConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  show,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Xác nhận in hoá đơn?</h2>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            In
          </button>
        </div>
      </div>
    </div>
  );
}
