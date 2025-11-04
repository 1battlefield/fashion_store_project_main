import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard"; // Chú ý đường dẫn ../

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/api/products";
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      });
  }, []);

  return (
    <main className="px-4 py-8 md:px-8 md:py-12">
      <div
        className="w-full h-[60vh] bg-gray-200 mb-12 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://bizweb.dktcdn.net/100/393/237/themes/774351/assets/slider_1.jpg')" }}>
        <div className="text-center text-white bg-black bg-opacity-30 p-8">
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-widest">New Collection</h1>
          <p className="mt-4 text-lg">Check out the latest trends</p>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 uppercase tracking-wider">New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} // Thêm ID để tạo link
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </main>
  );
};
