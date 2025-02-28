"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Upload, HelpCircle } from "lucide-react";
import { LocationPicker } from "@/components/location-picker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ReportFoundItem() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form logic would go here
      router.push("/report/success?type=found");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Report a Found Item</h1>
        <p className="text-muted-foreground mb-8">Help return this item to its owner and earn reward points!</p>

        <div className="flex justify-between mb-8">
          {["Item Details", "Location & Time", "Photos & Handover"].map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center pb-2 border-b-2 ${
                step >= index + 1 ? "border-primary font-medium" : "border-muted text-muted-foreground"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Describe the item you found</CardDescription>
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
                      {["Water Bottle", "Electronics", "Clothing", "Bag/Backpack", "ID Card", "Keys", "Other"].map(
                        (item, index) => (
                          <SelectItem key={index} value={item.toLowerCase().replace(/\s+/g, "-")}>
                            {item}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Describe the item in detail, but consider withholding one identifying feature that only the
                            true owner would know.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea id="description" placeholder="Describe color, brand, distinguishing features, etc." rows={4} required />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Next: Location & Time</Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Location & Time</CardTitle>
                <CardDescription>Where and when did you find this item?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Found Location</Label>
                  <div className="flex gap-2">
                    <Input id="location" placeholder="e.g. Library, 2nd floor" className="flex-1" required />
                    <Button type="button" variant="outline" onClick={() => setShowMap(!showMap)}>
                      <MapPin className="h-4 w-4 mr-2" />
                      {showMap ? "Hide Map" : "Show Map"}
                    </Button>
                  </div>
                </div>

                {showMap && (
                  <div className="rounded-md overflow-hidden border h-[300px] bg-muted flex items-center justify-center">
                    <LocationPicker />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit">Next: Photos & Handover</Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Photos & Handover</CardTitle>
                <CardDescription>Add photos and choose how to handle the item</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[["Upload Image", Upload], ["Take Photo", Camera]].map(([text, Icon], index) => (
                    <div
                      key={index}
                      className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 cursor-pointer"
                    >
                      <Icon className="h-8 w-8 mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">{text}</p>
                      <p className="text-xs text-muted-foreground mt-1">Drag & drop or click to browse</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handover">Item Handover Method</Label>
                  <Select defaultValue="keep">
                    <SelectTrigger>
                      <SelectValue placeholder="Select handover method" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "I'll keep it until the owner contacts me",
                        "I'll drop it at the campus lost & found office",
                        "I've given it to campus security",
                        "I left it where I found it (not recommended)",
                      ].map((option, index) => (
                        <SelectItem key={index} value={option.toLowerCase().replace(/\s+/g, "-")}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button type="submit">Submit Report</Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}
