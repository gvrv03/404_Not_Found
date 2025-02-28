"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Clock,
  MessageSquare,
  Share2,
  Flag,
  ThumbsUp,
  Eye,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";
import { LocationPicker } from "./LocationPicker";
import moment from "moment/moment";

const StuffDetailsTabs = ({ item }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showARView, setShowARView] = useState(false);
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="py-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="rounded-lg overflow-hidden border">
              <img
                src={item.ItemImage}
                alt={`${item.ItemName}`}
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{item.Description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Additional Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Report Date</p>
                  <p className="text-sm text-muted-foreground">
                    {moment(item.Date).format("lll")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">
                    {item.Category}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="location" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Location</CardTitle>
              <CardDescription>
                {item.type === "lost"
                  ? "Last seen at this location"
                  : "Found at this location"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md overflow-hidden border mb-4">
                <LocationPicker
                  YCordinates={item.YCordinates}
                  XCordinate={item.XCordinate}
                />
              </div>
              
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StuffDetailsTabs;
