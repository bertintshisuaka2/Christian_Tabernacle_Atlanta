import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = trpc.events.upcoming.useQuery();

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    worship: "bg-purple-100 text-purple-800",
    youth: "bg-blue-100 text-blue-800",
    community: "bg-green-100 text-green-800",
    outreach: "bg-orange-100 text-orange-800",
    prayer: "bg-pink-100 text-pink-800",
    other: "bg-gray-100 text-gray-800",
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Join us for fellowship, worship, and community activities.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="container">
          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  {event.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.eventDate), "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      {event.category && (
                        <Badge
                          variant="secondary"
                          className={categoryColors[event.category] || categoryColors.other}
                        >
                          {event.category}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    {event.description && (
                      <CardDescription className="text-base mt-2">
                        {event.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {format(new Date(event.eventDate), "h:mm a")}
                          {event.endDate && ` - ${format(new Date(event.endDate), "h:mm a")}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No upcoming events at this time.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Check back soon for new events and activities!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

