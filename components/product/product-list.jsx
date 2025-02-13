import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Trash } from "lucide-react";
import { Button } from "../ui/button";
import ProductForm from "./product-form";

function ProductList({ products, handleDelete, mutate }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products &&
        Array.isArray(products.res) &&
        products.res.map((product) => (
          <Card key={product._id} className="shadow-sm">
            <CardHeader>
              <CardTitle>{product?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm font-bold mt-1">Price: ₹{product.price}</p>
              <p className="text-sm">Category: {product.category}</p>
              <p className="text-xs text-gray-500">
                Created At: {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-2" /> View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Product Details</DialogTitle>
                    </DialogHeader>
                    <p>
                      <strong>Name:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Description:</strong> {product.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </DialogContent>
                </Dialog>

                <ProductForm
                  productValue={product}
                  mode="edit"
                  mutate={mutate}
                />

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
  );
}

export default ProductList;
