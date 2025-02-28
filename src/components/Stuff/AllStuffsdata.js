"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ListCollectionData } from "@/Services/Appwrite";
import { StuffCollection } from "@/config/appwrite";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  CalendarIcon,
  CircleIcon,
  FileTextIcon,
  LinkIcon,
  ListIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
} from "lucide-react";
import moment from "moment/moment";
import { Query } from "appwrite";

export default function AllStuffsdata() {
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
      <>
        <h2 className="py-5 text-2xl font-semibold">Recently Reported Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-xl" />
              <CardContent className="p-2 space-y-2">
                <div className="h-5 w-3/4 bg-gray-300 rounded" />
                <div className="h-4 w-1/2 bg-gray-300 rounded" />
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2 p-2">
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-xl md:text-3xl font-bold md:py-5 mb-2">
        Lost & Found Items
      </h1>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-2">
        {items.map((item) => (
          <ItemCard key={item.$id} item={item} />
        ))}
      </div>
    </div>
  );
}

export function ItemCard({ item }) {
  return (
    <Link href={`/AllStuffs/${item.$id}`} className="block">
      <Card className="hover:shadow-lg py-0 transition duration-300 rounded-xl overflow-hidden border border-gray-200 bg-white">
        {/* Image Section */}
        <div className="relative">
          <Badge
            className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-md text-white ${
              item.Report === "lost" ? "bg-orange-500" : "bg-green-500"
            }`}
          >
            <ListIcon size={14} />
            {item.Report}
          </Badge>

          {item?.ItemImage ? (
            <img
              src={item.ItemImage}
              alt={item.ItemName}
              width={300}
              height={200}
              className="w-full  object-cover rounded-t-xl"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Card Content */}
        <CardContent className="p-2 ] space-y-2 ">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <TagIcon size={16} className="text-gray-500" /> {item.ItemName}
          </h3>
          <p className="text-sm text-gray-600">
            {item.Description}
          </p>

         <div className="grid grid-cols-2 gap-2 mt-2" > <p className="text-sm text-gray-600 flex items-center gap-2">
            <MapPinIcon size={16} className="text-gray-500" />
            {item.Location}
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <FileTextIcon size={16} className="text-gray-500" />
            {item.Category}
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <CalendarIcon size={16} className="text-gray-500" />
            {moment(item.Date).format("lll")  }
          </p>
          {item.Contact && (
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <PhoneIcon size={16} className="text-gray-500" />
              {item.Contact}
            </p>
          )}

          <p className="text-sm text-gray-600 flex items-center gap-2">
            <CircleIcon size={16} className="text-gray-500" />
            {item.Status ? "Resolved" : "Pending"}
          </p></div>


         
        </CardContent>
      </Card>
    </Link>
  );
}
