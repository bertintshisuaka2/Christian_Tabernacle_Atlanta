import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Users, BookOpen, Globe } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Love & Compassion",
      description: "We believe in showing God's love through compassion and service to all people.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building authentic relationships and supporting one another in faith and life.",
    },
    {
      icon: BookOpen,
      title: "Biblical Teaching",
      description: "Grounded in Scripture, we seek to understand and apply God's Word to our lives.",
    },
    {
      icon: Globe,
      title: "Mission & Outreach",
      description: "Reaching beyond our walls to share hope and make a difference in the world.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Learn more about our church, our mission, and what we believe.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Community Church, our mission is to know Christ and make Him known. We are a community of believers dedicated to worshiping God, growing in faith, and serving others with love and compassion. We welcome people from all walks of life to join us on this journey of faith.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What We Believe</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>The Bible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe the Bible is the inspired Word of God, our ultimate authority for faith and life. It is trustworthy, true, and relevant for all generations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>God</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit. God is loving, just, and sovereign over all creation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jesus Christ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe Jesus Christ is the Son of God, fully God and fully man. Through His death and resurrection, He offers salvation and eternal life to all who believe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Church</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe the Church is the body of Christ, made up of all believers. We are called to worship together, encourage one another, and serve the world in Jesus' name.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Community Church was founded with a vision to create a welcoming place where people could encounter God's love and grow in their faith. Since our beginning, we have been committed to serving our community and making a positive impact in the lives of those around us.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Over the years, we have grown from a small gathering to a vibrant community of believers. Through worship services, community outreach, youth programs, and mission work, we continue to live out our calling to love God and love others.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We invite you to become part of our story. Whether you're exploring faith for the first time or looking for a church home, you are welcome here.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We'd love to meet you! Join us for worship this Sunday.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Plan Your Visit</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

