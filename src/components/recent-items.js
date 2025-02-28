import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";

const RecentItems = () => {
  const recentItems = [
    {
      id: 1,
      type: "lost",
      title: "Blue Hydroflask Water Bottle",
      location: "Science Building",
      time: "2 hours ago",
      image: "/placeholder.svg?height=200&width=200",
      category: "Water Bottle",
    },
    {
      id: 2,
      type: "found",
      title: "Student ID Card",
      location: "Library",
      time: "3 hours ago",
      image: "/placeholder.svg?height=200&width=200",
      category: "ID Card",
    },
    {
      id: 3,
      type: "lost",
      title: "Black Laptop Bag",
      location: "Student Center",
      time: "5 hours ago",
      image: "/placeholder.svg?height=200&width=200",
      category: "Bag",
    },
    {
      id: 4,
      type: "found",
      title: "Apple AirPods",
      location: "Gym",
      time: "Yesterday",
      image: "/placeholder.svg?height=200&width=200",
      category: "Electronics",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {recentItems.map((item) => (
        <Link href={`/items/${item.id}`} key={item.id} aria-label={`View details of ${item.title}`}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <div className="relative">
              <Badge className={`absolute top-2 right-2 ${item.type === "lost" ? "bg-orange-500" : "bg-green-500"}`}>
                {item.type === "lost" ? "Lost" : "Found"}
              </Badge>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="pt-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
              <Badge className="mb-2">{item.category}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{item.time}</span>
              </div>
            </CardContent>
            <CardFooter>
              <span className="text-sm text-primary font-medium">View Details →</span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RecentItems;
