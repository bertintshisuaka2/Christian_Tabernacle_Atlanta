import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, BookOpen, Users, Clock, MapPin } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";

export default function Home() {
  const { data: upcomingEvents } = trpc.events.upcoming.useQuery();
  const { data: recentSermons } = trpc.sermons.list.useQuery();
  const { data: serviceTimes } = trpc.serviceTimes.list.useQuery();

  const features = [
    {
      icon: BookOpen,
      title: "Weekly Sermons",
      description: "Join us for inspiring messages that bring hope and truth.",
      link: "/sermons",
    },
    {
      icon: Calendar,
      title: "Community Events",
      description: "Connect with others through fellowship and activities.",
      link: "/events",
    },
    {
      icon: Heart,
      title: "Prayer Support",
      description: "Share your prayer requests and pray for others.",
      link: "/prayer",
    },
    {
      icon: Users,
      title: "Get Involved",
      description: "Discover ways to serve and make a difference.",
      link: "/about",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Bible Image */}
        <div className="absolute inset-0">
          <img 
            src="/bible-logo.png" 
            alt="Open Bible" 
            className="w-full h-full object-cover opacity-40"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Overlaid Text Content */}
        <div className="relative z-10 container h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground italic">
            Christian Tabernacle of Atlanta
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 italic">
            A place where faith meets fellowship, and everyone belongs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Times */}
      {serviceTimes && serviceTimes.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Service Times</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {serviceTimes.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium capitalize">{service.dayOfWeek}</p>
                      <p className="text-muted-foreground">{service.time}</p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {service.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Discover Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.link}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Button variant="outline" asChild>
                <Link href="/events">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.slice(0, 3).map((event) => (
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(event.eventDate), "PPP")}</span>
                    </div>
                    <CardTitle>{event.title}</CardTitle>
                    {event.description && (
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Sermons */}
      {recentSermons && recentSermons.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Sermons</h2>
              <Button variant="outline" asChild>
                <Link href="/sermons">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSermons.slice(0, 3).map((sermon) => (
                <Card key={sermon.id} className="hover:shadow-lg transition-shadow">
                  {sermon.thumbnailUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">
                      {format(new Date(sermon.sermonDate), "PPP")}
                    </div>
                    <CardTitle>{sermon.title}</CardTitle>
                    <CardDescription>Speaker: {sermon.speaker}</CardDescription>
                    {sermon.scripture && (
                      <p className="text-sm text-primary mt-2">{sermon.scripture}</p>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us This Weekend
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Saturday 6:00 PM - 8:00 PM | Sunday 10:00 AM - 1:00 PM
          </p>
          <p className="text-lg mb-8 opacity-90">
            Experience worship, community, and hope. Everyone is welcome.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Plan Your Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/give">Give Online</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

