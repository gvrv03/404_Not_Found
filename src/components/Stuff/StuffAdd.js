"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Upload, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { AddDataToCollection } from "@/Services/Appwrite";
import { StuffCollection } from "@/config/appwrite";

export default function StuffAdd() {
  const [loading, setloading] = useState("");
  const [formData, setFormData] = useState({
    Report: "found",
    ItemName: "",
    Category: "",
    Location: "",
    Date: "",
    Description: "",
    ItemImage: null,
    Contact: "",
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      setloading(true);
      e.preventDefault();
      await AddDataToCollection(StuffCollection, formData);
      toast.success("Report submitted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <Card className="w-full md:max-w-[50%] mx-auto">
      <CardHeader>
        <CardTitle>Report an Item</CardTitle>
        <CardDescription>
          {formData.Report === "found"
            ? "Found something? Help it find its way back to its owner."
            : "Lost something? Let the community help you find it."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup
            value={formData.Report}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, Report: value }))
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="found" id="found" />
              <Label htmlFor="found">I found an item</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lost" id="lost" />
              <Label htmlFor="lost">I lost an item</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="ItemName">Item Name</Label>
            <Input
              id="ItemName"
              placeholder="e.g. Blue Hydroflask Water Bottle"
              value={formData.ItemName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Category">Category</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, Category: value }))
              }
            >
              <SelectTrigger id="Category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="personal-item">Personal Item</SelectItem>
                <SelectItem value="id-cards">ID/Cards</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="Location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="Location"
                  placeholder="e.g. Library, 2nd floor"
                  className="pl-10"
                  value={formData.Location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="Date"
                  type="date"
                  className="pl-10"
                  value={formData.Date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="Description">Description</Label>
            <Textarea
              id="Description"
              placeholder="Provide details that would help identify the item..."
              rows={4}
              value={formData.Description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Image (optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop an image, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or WEBP (max. 5MB)
              </p>
              <Input
                type="file"
                id="ItemImage"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => document.getElementById("ItemImage")?.click()}
              >
                Select Image
              </Button>
            </div>
          </div>

          {formData.Report === "found" && (
            <div className="space-y-2">
              <Label htmlFor="Contact">
                Where should the owner contact you?
              </Label>
              <Input
                id="Contact"
                placeholder="Email or phone number"
                value={formData.Contact}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">
                This will only be visible to registered users
              </p>
            </div>
          )}
          <Button className=" cursor-pointer w-full" type="submit">
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
