import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tag, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export interface ItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  location: string;
  date: string;
  imageUrl?: string;
  status: 'active' | 'claimed' | 'returned';
  type: 'lost' | 'found';
}

interface ItemCardProps {
  item: ItemData;
}

export function ItemCard({ item }: ItemCardProps) {
  const statusColors = {
    active: 'bg-success text-success-foreground',
    claimed: 'bg-warning text-warning-foreground',
    returned: 'bg-muted text-muted-foreground'
  };

  const typeColors = {
    lost: 'bg-destructive/10 text-destructive border-destructive/20',
    found: 'bg-success/10 text-success border-success/20'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-subtle border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={typeColors[item.type]}>
                {item.type === 'lost' ? 'Lost' : 'Found'}
              </Badge>
              <Badge className={statusColors[item.status]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {item.imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-primary" />
            {item.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1 text-primary" />
            {new Date(item.date).toLocaleDateString()}
          </div>
        </div>

        {item.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="h-3 w-3 text-muted-foreground" />
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">+{item.tags.length - 3}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link to={`/item/${item.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}