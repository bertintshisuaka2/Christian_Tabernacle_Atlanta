import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { Link, Redirect } from "wouter";
import {
  Calendar,
  BookOpen,
  Heart,
  Mail,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();

  const { data: allEvents } = trpc.events.list.useQuery();
  const { data: allSermons } = trpc.sermons.list.useQuery();
  const { data: allPrayerRequests } = trpc.prayerRequests.listAll.useQuery();
  const { data: contactMessages } = trpc.contact.list.useQuery();
  const { data: donations } = trpc.donations.list.useQuery();
  const { data: newsletterSubs } = trpc.newsletter.list.useQuery();

  const updatePrayerStatus = trpc.prayerRequests.updateStatus.useMutation();
  const updateContactStatus = trpc.contact.updateStatus.useMutation();
  const utils = trpc.useUtils();

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Redirect to="/" />;
  }

  const stats = [
    {
      title: "Total Events",
      value: allEvents?.length || 0,
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Total Sermons",
      value: allSermons?.length || 0,
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Prayer Requests",
      value: allPrayerRequests?.length || 0,
      icon: Heart,
      color: "text-pink-600",
    },
    {
      title: "Contact Messages",
      value: contactMessages?.filter((m) => m.status === "new").length || 0,
      icon: Mail,
      color: "text-green-600",
    },
    {
      title: "Newsletter Subscribers",
      value: newsletterSubs?.length || 0,
      icon: Users,
      color: "text-orange-600",
    },
    {
      title: "Total Donations",
      value: donations?.length || 0,
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ];

  const handleApprovePrayer = async (id: string) => {
    await updatePrayerStatus.mutateAsync({ id, status: "approved" });
    utils.prayerRequests.listAll.invalidate();
  };

  const handleMarkAsRead = async (id: string) => {
    await updateContactStatus.mutateAsync({ id, status: "read" });
    utils.contact.list.invalidate();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your church website content
              </p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Website</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="prayers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prayers">Prayer Requests</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
          </TabsList>

          {/* Prayer Requests */}
          <TabsContent value="prayers">
            <Card>
              <CardHeader>
                <CardTitle>Prayer Requests</CardTitle>
                <CardDescription>
                  Review and approve prayer requests for public display
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allPrayerRequests && allPrayerRequests.length > 0 ? (
                    allPrayerRequests.map((req) => (
                      <div
                        key={req.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{req.name}</span>
                              {req.email && (
                                <span className="text-sm text-muted-foreground">
                                  ({req.email})
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {format(new Date(req.createdAt!), "PPP")}
                            </p>
                            <p className="text-sm">{req.request}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 rounded bg-muted">
                                {req.isPublic === "yes" ? "Public" : "Private"}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${
                                  req.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : req.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {req.status}
                              </span>
                            </div>
                          </div>
                          {req.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprovePrayer(req.id)}
                            >
                              Approve
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No prayer requests yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Messages */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>
                  Messages from the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactMessages && contactMessages.length > 0 ? (
                    contactMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{msg.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {msg.email}
                              </span>
                            </div>
                            {msg.subject && (
                              <p className="text-sm font-medium mb-1">
                                Subject: {msg.subject}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mb-2">
                              {format(new Date(msg.createdAt!), "PPP")}
                            </p>
                            <p className="text-sm">{msg.message}</p>
                            <span
                              className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                                msg.status === "new"
                                  ? "bg-blue-100 text-blue-800"
                                  : msg.status === "read"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {msg.status}
                            </span>
                          </div>
                          {msg.status === "new" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkAsRead(msg.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No contact messages yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Donations</CardTitle>
                <CardDescription>Recent donation records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations && donations.length > 0 ? (
                    donations.map((donation) => (
                      <div
                        key={donation.id}
                        className="border rounded-lg p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold">
                            {donation.isAnonymous === "yes"
                              ? "Anonymous"
                              : donation.donorName || "Unknown"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(donation.createdAt!), "PPP")}
                          </p>
                          {donation.purpose && (
                            <p className="text-sm text-muted-foreground">
                              Purpose: {donation.purpose}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            ${(donation.amount / 100).toFixed(2)}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              donation.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : donation.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {donation.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No donations yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletter Subscribers */}
          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>
                  Active newsletter subscriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {newsletterSubs && newsletterSubs.length > 0 ? (
                    newsletterSubs.map((sub) => (
                      <div
                        key={sub.id}
                        className="border rounded-lg p-3 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{sub.email}</p>
                          {sub.name && (
                            <p className="text-sm text-muted-foreground">
                              {sub.name}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(sub.subscribedAt!), "PP")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No subscribers yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

