import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function Staff() {
  const { data: staffMembers, isLoading } = trpc.staff.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 italic">
            Our Pastors & Staff
          </h1>
          <p className="text-xl max-w-3xl mx-auto italic">
            Meet the dedicated leaders serving our church community
          </p>
        </div>

        {/* Staff Grid */}
        {staffMembers && staffMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {staffMembers.map((staff) => (
              <Card key={staff.id} className="overflow-hidden hover:shadow-2xl transition-shadow">
                <CardContent className="p-0">
                  {/* Photo */}
                  {staff.photoUrl && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={staff.photoUrl}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 italic">{staff.name}</h3>
                    <p className="text-lg mb-4 italic opacity-80">{staff.title}</p>
                    
                    {staff.bio && (
                      <p className="mb-4 italic leading-relaxed">{staff.bio}</p>
                    )}
                    
                    {/* Contact Info */}
                    <div className="space-y-2">
                      {staff.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${staff.email}`} className="hover:underline italic">
                            {staff.email}
                          </a>
                        </div>
                      )}
                      {staff.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${staff.phone}`} className="hover:underline italic">
                            {staff.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl italic">No staff members to display at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}

