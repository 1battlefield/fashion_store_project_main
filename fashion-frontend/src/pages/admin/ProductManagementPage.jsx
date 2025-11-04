import React, { useState, useEffect } from "react";
import api from "../../api/api.js"; // Chú ý đường dẫn import

export const ProductManagementPage = () => {
  // State để lưu danh sách sản phẩm
  const [products, setProducts] = useState([]);
  // State để điều khiển modal (form thêm/sửa)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State để lưu thông tin sản phẩm đang được sửa (hoặc null nếu là thêm mới)
  const [editingProduct, setEditingProduct] = useState(null);
  // State cho dữ liệu trong form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  // Hàm để lấy danh sách sản phẩm từ backend
  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    }
  };

  // Tự động gọi hàm fetchProducts khi component được render lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm mở modal
  const handleOpenModal = (product) => {
    if (product) {
      // Nếu có sản phẩm -> là chế độ Sửa
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price, imageUrl: product.imageUrl });
    } else {
      // Nếu không có -> là chế độ Thêm mới
      setEditingProduct(null);
      setFormData({ name: "", price: "", imageUrl: "" });
    }
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", imageUrl: "" });
  };

  // Hàm cập nhật state của form khi người dùng nhập liệu
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi submit form (Thêm mới hoặc Cập nhật)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Chế độ Cập nhật
        await api.put(`/api/admin/products/${editingProduct.id}`, formData);
      } else {
        // Chế độ Thêm mới
        await api.post("/api/admin/products", formData);
      }
      fetchProducts(); // Tải lại danh sách sản phẩm
      handleCloseModal(); // Đóng modal
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      alert("Đã có lỗi xảy ra!");
    }
  };

  // Hàm xử lý khi xóa sản phẩm
  const handleDelete = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await api.delete(`/api/admin/products/${productId}`);
        fetchProducts(); // Tải lại danh sách sản phẩm
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Đã có lỗi xảy ra!");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm</h1>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          + Thêm sản phẩm mới
        </button>
      </div>

      {/* Bảng hiển thị danh sách sản phẩm */}
      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img
                        className="w-full h-full object-cover rounded"
                        src={`${import.meta.env.VITE_BACKEND_URL}${product.imageUrl}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap font-semibold">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{product.price.toLocaleString("vi-VN")} VND</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal/Form cho việc Thêm/Sửa sản phẩm */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Tên sản phẩm</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">URL Hình ảnh</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="/images/ten_file.jpg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
                  Hủy
                </button>
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
