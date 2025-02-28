"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ListCollectionData } from "@/Services/Appwrite";
import { StuffCollection } from "@/config/appwrite";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AllStuffsdata() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await ListCollectionData(StuffCollection, []);
        setItems(response.documents);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold py-5 mb-2">Lost & Found Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((item) => (
          <ItemCard key={item.$id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item }) {
  return (
    <Link href={`/AllStuffs/${item.$id}`} className="block">
      <Card className="hover:shadow-md transition duration-300">
        <div className="relative">
          <Badge
            className={item.type === "lost" ? "bg-orange-500" : "bg-green-500"}
          >
            {item.Report}
          </Badge>
          {item?.ItemImage && (
            <img
              src={item.ItemImage}
              alt={item.ItemName}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          )}
        </div>
        <CardContent>
          <h3 className="font-semibold">{item.ItemName}</h3>
          <p className="text-sm text-gray-600">{item.Location}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
