import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { format } from "date-fns";
import { Heart, Send } from "lucide-react";
import { toast } from "sonner";

export default function Prayer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: publicRequests } = trpc.prayerRequests.list.useQuery();
  const createMutation = trpc.prayerRequests.create.useMutation();
  const utils = trpc.useUtils();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !request.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        name: name.trim(),
        email: email.trim() || undefined,
        request: request.trim(),
        isPublic: isPublic ? "yes" : "no",
      });

      toast.success("Prayer request submitted successfully");
      setName("");
      setEmail("");
      setRequest("");
      setIsPublic(false);
      utils.prayerRequests.list.invalidate();
    } catch (error) {
      toast.error("Failed to submit prayer request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prayer Requests</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Share your prayer needs and join us in praying for others.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prayer Request Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Submit a Prayer Request
                  </CardTitle>
                  <CardDescription>
                    We believe in the power of prayer. Share your request and our prayer team will lift you up.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="request">Prayer Request *</Label>
                      <Textarea
                        id="request"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="Share your prayer need..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="public"
                        checked={isPublic}
                        onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                      />
                      <Label
                        htmlFor="public"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Share this request publicly so others can pray
                      </Label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Public Prayer Requests */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Community Prayer Requests</h2>
              <p className="text-muted-foreground mb-6">
                Join us in praying for these requests from our community.
              </p>
              
              <div className="space-y-4">
                {publicRequests && publicRequests.length > 0 ? (
                  publicRequests.map((req) => (
                    <Card key={req.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{req.name}</CardTitle>
                            <CardDescription>
                              {format(new Date(req.createdAt!), "MMMM d, yyyy")}
                            </CardDescription>
                          </div>
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{req.request}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">
                        No public prayer requests at this time.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

