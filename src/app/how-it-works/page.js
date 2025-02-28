import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Search, BrainCircuit, MessageSquare, Award } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How Find My Stuff Works</h1>
        <p className="text-xl text-muted-foreground">
          Our AI-powered platform makes finding and returning lost items easier than ever
        </p>
      </div>

      <Tabs defaultValue="lost" className="mb-12">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lost">I Lost Something</TabsTrigger>
            <TabsTrigger value="found">I Found Something</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lost">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Report Your Lost Item</CardTitle>
                <CardDescription>Provide details and photos of your lost item</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fill out a simple form with details about your lost item, including when and where you last saw it.
                  Add photos to help with identification.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/report/lost" className="text-sm text-primary font-medium">
                  Report a Lost Item →
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. AI Matching System</CardTitle>
                <CardDescription>Our AI finds potential matches</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our advanced AI system compares your lost item report with all found items, analyzing images,
                  descriptions, and locations to find potential matches.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/search" className="text-sm text-primary font-medium">
                  View Matching System →
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Connect & Recover</CardTitle>
                <CardDescription>Securely message to arrange recovery</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  When a match is found, you will be notified immediately. Use our secure messaging system to connect with
                  the finder and arrange to recover your item.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/messages" className="text-sm text-primary font-medium">
                  View Messaging System →
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Additional Features for Lost Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">AR Navigation</h3>
                    <p className="text-muted-foreground">
                      Use augmented reality to navigate to the exact location where your item was found, making recovery
                      quick and easy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 rounded-full h-fit">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Smart Search</h3>
                    <p className="text-muted-foreground">
                      Our AI-powered search understands natural language, so you can describe your item in your own
                      words.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="found">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Report Found Item</CardTitle>
                <CardDescription>Document the item you found</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Take photos and provide details about the item you found, including where and when you found it. Our
                  system will start looking for the owner.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/report/found" className="text-sm text-primary font-medium">
                  Report a Found Item →
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Mark Location</CardTitle>
                <CardDescription>Pin the exact location on our map</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use our interactive map to mark precisely where you found the item. This helps the owner locate it
                  quickly using our AR navigation.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/map" className="text-sm text-primary font-medium">
                  View Map Features →
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Earn Rewards</CardTitle>
                <CardDescription>Get points for being a good Samaritan</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Earn points for reporting found items and helping return them to their owners. Redeem points for
                  campus perks and rewards.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/leaderboard" className="text-sm text-primary font-medium">
                  View Rewards System →
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How does the AI matching work?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI analyzes images, descriptions, locations, and timestamps to find potential matches between lost
                and found items. It uses computer vision to compare visual similarities and natural language processing
                to understand item descriptions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is my personal information secure?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, we take privacy seriously. Your contact information is never shared directly with other users. All
                communication happens through our secure in-app messaging system until you choose to meet in person.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How do I verify ownership of a lost item?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                When reporting a found item, you can set a verification question that only the true owner would know.
                Additionally, our system tracks item history and user reputation to prevent fraud.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}