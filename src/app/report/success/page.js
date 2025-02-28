"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Search, Home, Share2 } from "lucide-react";

export default function ReportSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") || "lost";

  const isLost = type === "lost";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Submitted Successfully!</CardTitle>
            <CardDescription>
              {isLost
                ? "Your lost item report has been submitted to our system."
                : "Thank you for reporting a found item!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium">Report ID: #LF{Math.floor(Math.random() * 10000)}</p>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </p>
            </div>

            <div className="text-left space-y-2">
              <p className="text-sm">
                {isLost
                  ? "Our AI system is now searching for matching found items. You'll receive notifications if potential matches are found."
                  : "Our AI system is now searching for the owner of this item. You'll earn points when the item is claimed!"}
              </p>

              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle className="h-4 w-4" />
                <span>
                  {isLost
                    ? "70% of items are found within 48 hours"
                    : "You've earned 50 points for being a good Samaritan"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {isLost ? (
              <Button className="w-full" onClick={() => router.push("/search?filter=found")}>
                <Search className="h-4 w-4 mr-2" />
                Browse Found Items
              </Button>
            ) : (
              <Button className="w-full" onClick={() => router.push("/search?filter=lost")}>
                <Search className="h-4 w-4 mr-2" />
                Browse Lost Items
              </Button>
            )}

            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1" onClick={() => router.push("/")}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
