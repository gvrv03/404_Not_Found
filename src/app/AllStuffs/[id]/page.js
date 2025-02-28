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
import { LocationPicker } from "@/components/Stuff/LocationPicker";

export default function ItemDetailPage() {
  const params = useParams();
  const itemId = params.id;
  const [activeTab, setActiveTab] = useState("details");
  const [showARView, setShowARView] = useState(false);

  // Mock data for demonstration
  const item = {
    id: itemId,
    type: "lost",
    title: "Blue Hydroflask Water Bottle",
    description:
      "21oz navy blue Hydroflask with a white lid and a small dent on the bottom. Has a sticker of a mountain on the side.",
    location: "Science Building, Room 302",
    time: "May 15, 2023 at 2:30 PM",
    category: "Water Bottle",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      joinedDate: "Jan 2023",
    },
    matchingItems: [
      {
        id: 101,
        type: "found",
        title: "Blue Water Bottle",
        location: "Science Building Hallway",
        time: "May 15, 2023",
        image: "/placeholder.svg?height=200&width=200",
        matchScore: 92,
      },
      {
        id: 102,
        type: "found",
        title: "Hydroflask Bottle",
        location: "Student Center",
        time: "May 16, 2023",
        image: "/placeholder.svg?height=200&width=200",
        matchScore: 78,
      },
    ],
  };

  return (
    <div className="container mx-auto  ">
      <Link
        href="/search"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                className={
                  item.type === "lost" ? "bg-orange-500" : "bg-green-500"
                }
              >
                {item.type === "lost" ? "Lost" : "Found"}
              </Badge>
              <Badge variant="outline">{item.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {item.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden border"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} - Image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Report Date</p>
                      <p className="text-sm text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Reward</p>
                      <p className="text-sm text-muted-foreground">
                        {item.type === "lost" ? "Yes - $10" : "N/A"}
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
                    <LocationPicker />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowARView(!showARView)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {showARView ? "Hide AR View" : "Show AR Navigation"}
                    </Button>
                    <Button>Get Directions</Button>
                  </div>

                  {showARView && (
                    <div className="mt-4 rounded-md overflow-hidden border h-[300px] bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="font-medium mb-2">AR Navigation View</p>
                        <p className="text-sm text-muted-foreground">
                          In the real app, this would show an AR camera view
                          with directions to the item location
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches" className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Potential Matches</h2>
              {item.matchingItems.length > 0 ? (
                <div className="space-y-4">
                  {item.matchingItems.map((matchItem) => (
                    <Link href={`/items/${matchItem.id}`} key={matchItem.id}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4">
                              <Image
                                src={matchItem.image || "/placeholder.svg"}
                                alt={matchItem.title}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                              />
                            </div>
                            <div className="p-4 flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <Badge
                                  className={
                                    matchItem.type === "lost"
                                      ? "bg-orange-500"
                                      : "bg-green-500"
                                  }
                                >
                                  {matchItem.type === "lost" ? "Lost" : "Found"}
                                </Badge>
                                <Badge className="bg-primary">
                                  {matchItem.matchScore}% Match
                                </Badge>
                              </div>
                              <h3 className="font-semibold text-lg mb-2">
                                {matchItem.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{matchItem.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{matchItem.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                      <AlertTriangle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No matches found yet
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Our AI is still searching for potential matches. Check
                      back later or enable notifications to be alerted when
                      matches are found.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
              <CardDescription>
                {item.type === "lost"
                  ? "Contact the owner if you found this item"
                  : "Contact the finder if this is your item"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={item.owner.avatar || "/placeholder.svg"}
                  alt={item.owner.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{item.owner.name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{item.owner.rating} rating</span>
                  </div>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mb-2">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message {item.owner.name}</DialogTitle>
                    <DialogDescription>
                      Send a message regarding this {item.type} item
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Textarea
                      placeholder={`Hi ${item.owner.name}, I'm messaging about your ${item.title}...`}
                      rows={5}
                    />
                    <div className="flex justify-end">
                      <Button>Send Message</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Verification</CardTitle>
              <CardDescription>Our AI has analyzed this report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Image authenticity verified</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Location data consistent</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm">Report details complete</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <p className="text-sm">Similar items reported nearby</p>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Our AI system has verified this report with 94% confidence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
