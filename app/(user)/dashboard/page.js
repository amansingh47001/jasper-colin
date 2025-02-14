"use client";
import useSWR from "swr";
import axios from "axios";
import ProductForm from "@/components/product/product-form";
import ProductList from "@/components/product/product-list";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/product-service";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data: products, mutate } = useSWR("/api/products", fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
  });

  // To delete product
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      mutate();
    } catch (err) {
      console.log(err, "err");
      toast.error(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

        <ProductForm mutate={mutate} />
      </div>

      <ProductList
        products={products}
        handleDelete={handleDelete}
        mutate={mutate}
      />
    </>
  );
};

export default Dashboard;
