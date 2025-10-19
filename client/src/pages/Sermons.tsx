import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { Play, Download } from "lucide-react";

export default function Sermons() {
  const { data: sermons, isLoading } = trpc.sermons.list.useQuery();

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="text-center">Loading sermons...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sermon Library</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Listen to inspiring messages from our pastors and guest speakers.
          </p>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-12">
        <div className="container">
          {sermons && sermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon) => (
                <Card key={sermon.id} className="flex flex-col">
                  {sermon.thumbnailUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg relative group">
                      <img
                        src={sermon.thumbnailUrl}
                        alt={sermon.title}
                        className="w-full h-full object-cover"
                      />
                      {sermon.videoUrl && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="lg" className="rounded-full">
                            <Play className="w-6 h-6" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">
                      {format(new Date(sermon.sermonDate), "MMMM d, yyyy")}
                    </div>
                    <CardTitle className="line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription>Speaker: {sermon.speaker}</CardDescription>
                    {sermon.scripture && (
                      <p className="text-sm text-primary font-medium mt-2">
                        {sermon.scripture}
                      </p>
                    )}
                    {sermon.series && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Series: {sermon.series}
                      </p>
                    )}
                    {sermon.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {sermon.description}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      {sermon.videoUrl && (
                        <Button variant="default" className="flex-1" asChild>
                          <a href={sermon.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </a>
                        </Button>
                      )}
                      {sermon.audioUrl && (
                        <Button variant="outline" className="flex-1" asChild>
                          <a href={sermon.audioUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4 mr-2" />
                            Audio
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No sermons available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

