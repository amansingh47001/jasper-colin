"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/services/auth-service";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  async function logoutUser() {
    try {
      const { data } = await logout();
      toast.success(data?.message || "User logout successfully.");
      localStorage.clear();
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {user?.firstname || "" } {user?.lastname || ""}
        </h1>
        <p>{user?.username || ""}</p>
      </div>

      <Button variant="destructive" className="flex gap-2" onClick={logoutUser}>
        <LogOut size={16} /> Logout
      </Button>
    </nav>
  );
}

export default Navbar;
