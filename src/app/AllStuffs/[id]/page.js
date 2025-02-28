import Image from "next/image";
import Link from "next/link";
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
import { GetSingleDocument } from "@/Services/Appwrite";
import { StuffCollection } from "@/config/appwrite";
import moment from "moment/moment";
import StuffDetailsTabs from "@/components/Stuff/StuffDetailsTabs";
import PersonDetails from "@/components/Stuff/PersonDetails";

export default async function ItemDetailPage({ params }) {
  const staffID = await params.id;
  const staffData = await GetSingleDocument(staffID, StuffCollection);

  return (
    <>
      <div className="container mx-auto">
        <Link
          href="/AllStuffs"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={
                    staffData.Report === "lost"
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }
                >
                  {staffData.Report === "lost" ? "Lost" : "Found"}
                </Badge>
                <Badge variant="outline">{staffData.Category}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{staffData.ItemName}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{staffData.Location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{moment(staffData.Date).format("lll")}</span>
                </div>
              </div>
            </div>
          <StuffDetailsTabs item={staffData}/>
          </div>

          <PersonDetails staffData={staffData}/>
        </div>


      </div>
    </>
  );
}
