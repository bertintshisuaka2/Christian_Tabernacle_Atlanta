import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trpc } from "@/lib/trpc";
import { Heart, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function Give() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = trpc.donations.create.useMutation();

  const presetAmounts = ["25", "50", "100", "250", "500"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = amount === "custom" ? customAmount : amount;
    
    if (!finalAmount || parseFloat(finalAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    if (!isAnonymous && (!donorName.trim() || !donorEmail.trim())) {
      toast.error("Please provide your name and email");
      return;
    }

    setIsSubmitting(true);
    try {
      await createMutation.mutateAsync({
        amount: Math.round(parseFloat(finalAmount) * 100), // Convert to cents
        donorName: isAnonymous ? undefined : donorName.trim(),
        donorEmail: isAnonymous ? undefined : donorEmail.trim(),
        purpose: purpose === "general" ? undefined : purpose,
        isAnonymous: isAnonymous ? "yes" : "no",
      });

      toast.success("Thank you for your generous donation!");
      setAmount("");
      setCustomAmount("");
      setDonorName("");
      setDonorEmail("");
      setPurpose("general");
      setIsAnonymous(false);
    } catch (error) {
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your generosity helps us serve our community and spread hope.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Why Give Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Why Give?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Your donations support our mission to serve the community through worship, outreach, and fellowship.
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">Your gifts help us:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Support local families in need</li>
                      <li>Maintain our facilities</li>
                      <li>Fund youth and children's programs</li>
                      <li>Reach out to the community</li>
                      <li>Support missionaries worldwide</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Give</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">Mail a Check</p>
                    <p className="mt-1">
                      Community Church
                      <br />
                      123 Church Street
                      <br />
                      City, State 12345
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">In Person</p>
                    <p className="mt-1">
                      Drop off your donation at our office during service times or office hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Make a Donation
                  </CardTitle>
                  <CardDescription>
                    All donations are secure and tax-deductible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Selection */}
                    <div>
                      <Label className="mb-3 block">Select Amount</Label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {presetAmounts.map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant={amount === preset ? "default" : "outline"}
                            onClick={() => {
                              setAmount(preset);
                              setCustomAmount("");
                            }}
                          >
                            ${preset}
                          </Button>
                        ))}
                        <Button
                          type="button"
                          variant={amount === "custom" ? "default" : "outline"}
                          onClick={() => setAmount("custom")}
                        >
                          Custom
                        </Button>
                      </div>
                      {amount === "custom" && (
                        <div className="mt-3">
                          <Label htmlFor="customAmount">Custom Amount ($)</Label>
                          <Input
                            id="customAmount"
                            type="number"
                            min="1"
                            step="0.01"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Purpose */}
                    <div>
                      <Label className="mb-3 block">Donation Purpose</Label>
                      <RadioGroup value={purpose} onValueChange={setPurpose}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="font-normal cursor-pointer">
                            General Fund
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="missions" id="missions" />
                          <Label htmlFor="missions" className="font-normal cursor-pointer">
                            Missions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="building" id="building" />
                          <Label htmlFor="building" className="font-normal cursor-pointer">
                            Building Fund
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="youth" id="youth" />
                          <Label htmlFor="youth" className="font-normal cursor-pointer">
                            Youth Ministry
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Donor Information */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={isAnonymous}
                          onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                        />
                        <Label
                          htmlFor="anonymous"
                          className="text-sm font-normal cursor-pointer"
                        >
                          Make this donation anonymous
                        </Label>
                      </div>

                      {!isAnonymous && (
                        <>
                          <div>
                            <Label htmlFor="donorName">Your Name *</Label>
                            <Input
                              id="donorName"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              placeholder="John Doe"
                              required={!isAnonymous}
                            />
                          </div>

                          <div>
                            <Label htmlFor="donorEmail">Email *</Label>
                            <Input
                              id="donorEmail"
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              placeholder="john@example.com"
                              required={!isAnonymous}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      <Heart className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Processing..." : "Complete Donation"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      This is a demo. No actual payment will be processed.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

