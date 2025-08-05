import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClaimModal } from "@/components/modals/ClaimModal";
import { StatusBadge } from "@/components/items/StatusBadge";
import { ItemData } from "@/components/items/ItemCard";
import { Calendar, MapPin, Tag, ArrowLeft, MessageCircle, Phone, Mail } from "lucide-react";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  useEffect(() => {
    fetchItemDetail();
  }, [id]);

  const fetchItemDetail = async () => {
    setLoading(true);
    try {
      // call GET /api/items/:id here
      
      // Mock data for demonstration
      const mockItem: ItemData = {
        id: id || "1",
        title: "Black iPhone 13",
        description: "Lost my black iPhone 13 near the library. Has a clear case with a university sticker on the back. The phone has a small scratch on the bottom right corner. It's really important to me as it has all my photos and contacts.",
        category: "Electronics",
        tags: ["phone", "iphone", "black", "clear case"],
        location: "Main Library, 2nd floor study area",
        date: "2024-01-10",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
        status: "active",
        type: "lost"
      };
      
      setItem(mockItem);
    } catch (error) {
      console.error('Failed to fetch item details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimItem = () => {
    setIsClaimModalOpen(true);
  };

  const handleContactOwner = () => {
    // open contact modal or redirect to messaging
    console.log('Contact owner functionality');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80 bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-muted-foreground">Item not found</h1>
            <Button onClick={() => navigate('/dashboard/lost')} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            {item.imageUrl && (
              <div className="aspect-square rounded-lg overflow-hidden bg-muted shadow-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
                <div className="flex gap-2">
                  <Badge variant="outline" className={
                    item.type === 'lost' 
                      ? 'bg-destructive/10 text-destructive border-destructive/20' 
                      : 'bg-success/10 text-success border-success/20'
                  }>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </Badge>
                  <StatusBadge status={item.status} />
                </div>
              </div>

              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>{item.type === 'lost' ? 'Lost on' : 'Found on'} {new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-foreground">{item.category}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>

            {item.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {item.status === 'active' && (
                <Button
                  onClick={handleClaimItem}
                  size="lg"
                  className="w-full"
                  variant={item.type === 'lost' ? 'default' : 'secondary'}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {item.type === 'lost' ? 'I Found This Item' : 'This Is My Item'}
                </Button>
              )}
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleContactOwner}
                className="w-full"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact {item.type === 'lost' ? 'Owner' : 'Finder'}
              </Button>
            </div>

            {item.status !== 'active' && (
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-muted-foreground">
                  {item.status === 'claimed' && 'This item has been claimed and is pending verification.'}
                  {item.status === 'returned' && 'This item has been successfully returned to its owner.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar {item.type === 'lost' ? 'Lost' : 'Found'} Items</h2>
          <div className="text-center text-muted-foreground py-8">
            <p>Similar items functionality would be implemented here</p>
            {/* Similar items component would go here */}
          </div>
        </div>
      </div>

      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        itemId={item.id}
        itemTitle={item.title}
        claimQuestion="What color is the phone case, and what sticker is on it?"
      />
    </div>
  );
}