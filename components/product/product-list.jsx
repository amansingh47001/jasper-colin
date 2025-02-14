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
          <Card key={product._id} className="shadow-sm flex flex-col h-full">
            <CardHeader>
              <CardTitle>{product?.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              {/* Truncated Description */}
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>

              {/* Category Badge */}
              <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 mt-2 rounded text-xs">
                {product.category}
              </span>
            </CardContent>

            {/* Bottom Section with Price & Date */}
            <div className="p-4 text-sm text-gray-500 flex justify-between">
              <span className="text-gray-400">
                Created At: {new Date(product.createdAt).toLocaleDateString()}
              </span>
              <span className="font-semibold text-gray-900">
                ₹{product.price}
              </span>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-2 p-4 border-t">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" /> View
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-lg">Product Details</DialogTitle>
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

              <ProductForm productValue={product} mode="edit" mutate={mutate} />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete("1")}
              >
                <Trash size={16} className="mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default ProductList;
