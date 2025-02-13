"use client";

import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, Search, Eye, Pencil, Trash, Plus } from "lucide-react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Dashboard = () => {
  const { data: products, mutate } = useSWR("/api/products", fetcher);

  const { trigger: addProduct } = useSWRMutation(
    "/api/products",
    (url, { arg }) => axios.post(url, arg).then((res) => res.data)
  );

  const { trigger: updateProduct } = useSWRMutation(
    "/api/products",
    (url, { arg }) => axios.put(`${url}/${arg.id}`, arg).then((res) => res.data)
  );

  const { trigger: deleteProduct } = useSWRMutation(
    "/api/products",
    (url, { arg }) => axios.delete(`${url}/${arg}`).then((res) => res.data)
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (formData.id) {
      await updateProduct({ id: formData.id, ...formData });
    } else {
      await addProduct(formData);
    }
    mutate();
    setIsFormModalOpen(false);
    setFormData({ name: "", description: "", price: "", category: "" });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    mutate();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navigation Bar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Company Name</h1>
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
          />
        </div>
        <Button variant="destructive" className="flex gap-2">
          <LogOut size={16} /> Logout
        </Button>
      </nav>

      {/* ✅ Dashboard Content */}
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={16} className="mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {formData.id ? "Edit Product" : "Add Product"}
                </DialogTitle>
              </DialogHeader>
              {/* ✅ Add/Edit Product Form */}
              <div className="space-y-3">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />

                <Label>Price</Label>
                <Input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  type="number"
                />

                <Label>Category</Label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {formData.id ? "Update" : "Add"} Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Card key={product._id} className="shadow-sm">
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm font-bold mt-1">
                  Price: ₹{product.price}
                </p>
                <p className="text-sm">Category: {product.category}</p>
                <p className="text-xs text-gray-500">
                  Created At: {new Date(product.createdAt).toLocaleDateString()}
                </p>
                {/* ✅ Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Dialog
                    open={isViewModalOpen}
                    onOpenChange={setIsViewModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <Eye size={16} className="mr-2" /> View
                      </Button>
                    </DialogTrigger>
                    {selectedProduct && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Product Details</DialogTitle>
                        </DialogHeader>
                        <p>
                          <strong>Name:</strong> {selectedProduct.name}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {selectedProduct.description}
                        </p>
                        <p>
                          <strong>Price:</strong> ₹{selectedProduct.price}
                        </p>
                        <p>
                          <strong>Category:</strong> {selectedProduct.category}
                        </p>
                        <p>
                          <strong>Created At:</strong>{" "}
                          {new Date(
                            selectedProduct.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </DialogContent>
                    )}
                  </Dialog>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setFormData(product);
                      setIsFormModalOpen(true);
                    }}
                  >
                    <Pencil size={16} className="mr-2" /> Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash size={16} className="mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
