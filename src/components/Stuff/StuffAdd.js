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
import { MapPin, Upload, Calendar, X } from "lucide-react";
import toast from "react-hot-toast";
import { AddDataToCollection, uploadImageAndGetURL } from "@/Services/Appwrite";
import { StuffCollection } from "@/config/appwrite";
import { LocationPicker } from "./LocationPicker";

export default function StuffAdd() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  console.log(imagePreview);

  const [formData, setFormData] = useState({
    Report: "found",
    ItemName: "",
    Category: "",
    Location: "",
    Date: "",
    Description: "",
    ItemImage: "",
    Contact: "",
  });
const [XCordinate, setXCordinate] = useState(50);
const [YCordinate, setYCordinate] = useState(50);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle Image Upload
  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const toastId = toast.loading("Uploading image...");
      const imageUrl = await uploadImageAndGetURL(file);

      setFormData((prev) => ({
        ...prev,
        ItemImage: imageUrl,
      }));
      setImagePreview(imageUrl);

      toast.dismiss(toastId);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Image upload failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await AddDataToCollection(StuffCollection, {...formData, XCordinate:parseInt(XCordinate), YCordinate: parseInt( YCordinate)});  
      toast.success("Report submitted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
        <form className="space-y-6">
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
              <div className="flex gap-2 relative">
                <Input
                  id="Location"
                  placeholder="e.g. Library, 2nd floor"
                  className="pl-5"
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
 <LocationPicker setXCordinate={setXCordinate} setYCordinate={setYCordinate} />

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

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Image (optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, ItemImage: "" }));
                    }}
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Drag and drop an image, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP (max. 5MB)
                  </p>
                </>
              )}
              <Input
                type="file"
                id="ItemImage"
                accept="image/*"
                // className="hidden"
                onChange={handleImageUpload}
              />
              {/* <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => document.getElementById("ItemImage")?.click()}
              >
                Select Image
              </Button> */}
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
          <Button
            onClick={handleSubmit}
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
