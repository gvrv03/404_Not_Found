"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Upload } from "lucide-react";
import { LocationPicker } from "@/components/location-picker";

export default function ReportLostItem() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/report/success?type=lost");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report a Lost Item</h1>
        <p className="text-muted-foreground mb-8">Provide details about your lost item to help us find it.</p>

        <div className="flex justify-between mb-8">
          {["Item Details", "Location & Time", "Photos & Contact"].map((title, index) => (
            <div
              key={index}
              className={`flex-1 text-center pb-2 border-b-2 ${step >= index + 1 ? "border-primary font-medium" : "border-muted text-muted-foreground"}`}
            >
              {title}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Describe your lost item in detail</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Name</Label>
                  <Input id="title" placeholder="e.g. Blue Hydroflask Water Bottle" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue="water-bottle">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Water Bottle", "Electronics", "Clothing", "Bag/Backpack", "ID Card", "Keys", "Other"].map((item, index) => (
                        <SelectItem key={index} value={item.toLowerCase().replace(/\s/g, "-")}>{item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea id="description" placeholder="Describe color, brand, distinguishing features, contents, etc." rows={4} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Approximate Value (Optional)</Label>
                  <Input id="value" type="number" placeholder="e.g. 25" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Next: Location & Time</Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}