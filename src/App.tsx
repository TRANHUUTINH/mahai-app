import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuManagement from "./pages/MenuManagement";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const password = "mahai123456"; // Mật khẩu cố định

  useEffect(() => {
    const savedUnlocked = localStorage.getItem("isUnlocked");
    if (savedUnlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsUnlocked(true);
      localStorage.setItem("isUnlocked", "true");
    } else {
      alert("❌ Sai mật khẩu!");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleUnlock}
          className="bg-white p-6 rounded shadow w-[300px]"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            🔒 Nhập mật khẩu để sử dụng
          </h2>
          <input
            type="password"
            placeholder="Mật khẩu..."
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
          >
            Mở khoá
          </button>
        </form>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="p-4 flex gap-4 bg-gray-100 shadow">
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold rounded"
        >
          Trang chính
        </Link>
        <Link
          to="/admin"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 font-bold rounded"
        >
          Quản lý menu
        </Link>
        <button
          onClick={() => {
            setIsUnlocked(false);
            localStorage.removeItem("isUnlocked");
          }}
          className="ml-auto bg-red-500 hover:bg-red-700 text-white px-4 py-2 font-bold rounded"
        >
          Khoá lại
        </button>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<MenuManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
