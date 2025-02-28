"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StuffCollection } from "@/config/appwrite";
import { ListCollectionData } from "@/Services/Appwrite";
import { Query } from "appwrite";
import { Award, CheckCircle, Users } from "lucide-react";
import { useEffect, useState } from "react";

const StatsCards = () => {
  const [StatsData, setStatsData] = useState({
    returnStuff: 0,
    foundStuff: 0,
    lostStuff: 0,
  });
  const [loading, setLoading] = useState(true);

  const getStats = async () => {
    try {
      const getReturn = await ListCollectionData(StuffCollection, [
        Query.equal("Status", true),
      ]);

      const getFounds = await ListCollectionData(StuffCollection, [
        Query.equal("Report", "found"),
      ]);

      const getLost = await ListCollectionData(StuffCollection, [
        Query.equal("Report", "lost"),
      ]);

      setStatsData({
        returnStuff: getReturn.total,
        foundStuff: getFounds.total,
        lostStuff: getLost.total,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  const renderStatCard = (title, value, description, Icon) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-10 w-24 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Community Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderStatCard(
          "Items Returned",
          StatsData?.returnStuff,
          "",
          CheckCircle
        )}
        {renderStatCard("Found Items", StatsData?.foundStuff, "", Users)}
        {renderStatCard("Lost Items", StatsData?.lostStuff, "", Award)}
      </div>
    </section>
  );
};

export default StatsCards;
