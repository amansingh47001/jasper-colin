"use client";
import useSWR from "swr";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search } from "lucide-react";
import ProductForm from "@/components/product/product-form";
import ProductList from "@/components/product/product-list";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data: products, mutate } = useSWR("/api/products", fetcher);
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      mutate();
    } catch (err) {
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
    //   </div>
    // </div>
  );
};

export default Dashboard;
