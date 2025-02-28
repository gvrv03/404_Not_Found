"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Clock, QrCode } from "lucide-react";
import { StuffCollection } from "@/config/appwrite";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { ListCollectionData } from "@/Services/Appwrite";
import { ItemCard } from "./Stuff/AllStuffsdata";

const RecentItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await ListCollectionData(StuffCollection, [
          Query.orderDesc(),
          Query.limit(4),
        ]);
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
    <>
      <h2 className="py-5 text-2xl font-semibold">Recently Reported Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.$id} item={item} />
        ))}
      </div>
    </>
  );
};

export default RecentItems;
