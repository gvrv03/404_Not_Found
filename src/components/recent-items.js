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

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="h-40 bg-gray-300 rounded-md" />
            <CardFooter className="flex flex-col gap-2 p-4">
              <div className="h-5 w-3/4 bg-gray-300 rounded" />
              <div className="h-4 w-1/2 bg-gray-300 rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="flex pb-2 mt-5 border-b mb-2 border-gray-200 justify-between items-center">
        <h2 className=" text-2xl font-semibold">Recently Reported Items</h2>
        <Link href="/AllStuffs">See All</Link>
      </div>{" "}
      {items.length < 1 && "No Items Found"}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <ItemCard key={item.$id} item={item} />
        ))}
      </div>
    </>
  );
};

export default RecentItems;
