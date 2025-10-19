import { APP_TITLE } from "@/const";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bird, Users, BookOpen, Globe } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Bird,
      title: "The End Time Message",
      description: "William Marrion Branham: William Branham and his prophetic ministry in the end-time. We claim to believe as the Holy Scripture says and acknowledge with thankful hearts that we are now living close to the second coming of Christ.",
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
              At {APP_TITLE}, our mission is to know Christ and make Him known. We are a community of believers dedicated to worshiping God, growing in faith, and serving others with love and compassion. We welcome people from all walks of life to join us on this journey of faith.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">The Prophetic and Apostolic Ministry</h2>
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
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Holy Scripture is the only source and complete foundation of our faith, the only guideline in teaching and life. God through His prophets in the Old Testament and by the apostles in the New Testament has left with us all we need to know. The Bible contains the whole testimony of God whereunto nothing can be added like it is with a last will.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Only what the apostles left behind in the New Testament is indeed »apostolic teaching«. Only what the Bible truly teaches is »biblical«. Only what originates with Christ Himself is »Christian«. Statements of faith declared at different councils in the course of church history are rejected as additions and forgery of the original Word.
            </p>
          </div>
        </div>
      </section>

      {/* William Branham Ministry */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">William Branham and His Prophetic Ministry in the End-Time</h2>
          <div className="flex justify-center mb-8">
            <img 
              src="/william-branham.jpg" 
              alt="William Branham" 
              className="w-64 h-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We claim to believe as the Holy Scripture says and acknowledge with thankful hearts that we are now living close to the second coming of Christ. We see Bible prophecies fulfilled as it was at His first coming. The New Testament began with the fulfilment of scriptural prophecies and ends the same way.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The promise that a voice would cry in the wilderness (Isa. 40:3) and that the Lord would send His messenger to prepare His way (Mal. 3:1) became a living reality in the ministry of John the Baptist. This we find confirmed in Mt. 11:10; Mk. 1:1-4; Lk. 1:16-17; Jn. 1:19-28.
            </p>
          </div>
        </div>
      </section>

      {/* Ewald Frank Ministry */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">The Ministry of Matthew 24:45-47</h2>
          <div className="flex justify-center mb-8">
            <img 
              src="/ewald-frank.jpg" 
              alt="Ewald Frank" 
              className="w-64 h-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We exhort you to pay attention to these ministries that God has raised up among His people, knowing that God does not repent of His gifts or His calling (Romans 11:29). But we do not want to stop at a particular ministry, or its representative, but we must take into consideration all the ministries of the Word that God has provided, serving for our perfection according to what is written in Ephesians 4, verses 11 to 15:
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 italic">
              "And He gave some as apostles, some as prophets, some as evangelists, some as pastors and teachers, for the equipping of the saints for the work of ministry, for the edifying of the body of Christ, till we all come to the unity of the faith and of the knowledge of the Son of God, to a perfect man, to the measure of the stature of the fullness of Christ; that we should no longer be children, tossed to and fro and carried about with every wind of doctrine, by the trickery of men, in the cunning craftiness of deceitful plotting, but, speaking the truth in love, may grow up in all things into Him who is the head—Christ."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For a better understanding of the Holy Scriptures, serving for your edification, we therefore invite you to read the brochures, expositions, and circular letters available on this site.
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

