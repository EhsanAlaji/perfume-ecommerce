"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { Brand } from "@/type/brand.type";
import { getMyToken } from "@/utilities/getMyToken";

interface Props {
  brandId: string;
}

const SingleBrand: React.FC<Props> = ({ brandId }) => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrand = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const token = await getMyToken();

      if (!token) {
        setError("Unauthorized: Token not found");
        setLoading(false);
        return;
      }

      const response = await axios.get<{ data: Brand }>(
        `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
        {
          headers: {
            token,
          },
        }
      );

      setBrand(response.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data?.message || "Brand not found");
      } else {
        setError("Brand not found");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (brandId) {
      fetchBrand();
    }
  }, [brandId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!brand) return <p>No Brand Found</p>;

  return (
    <div>
      <h2>{brand.name}</h2>
      <img
        src={brand.image}
        alt={brand.name}
        width={250}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default SingleBrand;