"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Brand } from "@/type/brand.type";

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Brand[] }>(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );

      setBrands(response.data.data);
    } catch (err: unknown) {
      // ✅ التحقق من نوع الخطأ
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap">
      {brands.map((brand) => (
        <div
          key={brand._id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div className="border rounded-lg p-4 text-center">
            <h4 className="mb-2 font-semibold">{brand.name}</h4>
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-32 object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Brands;