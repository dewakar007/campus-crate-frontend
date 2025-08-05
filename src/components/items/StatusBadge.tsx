import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Package } from "lucide-react";

interface StatusBadgeProps {
  status: 'active' | 'claimed' | 'returned';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      icon: Clock,
      className: 'bg-success text-success-foreground'
    },
    claimed: {
      label: 'Claimed',
      icon: Package,
      className: 'bg-warning text-warning-foreground'
    },
    returned: {
      label: 'Returned',
      icon: CheckCircle,
      className: 'bg-muted text-muted-foreground'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}