import { Badge } from "@/components/ui/badge";

interface UnitStatusBadgeProps {
  isActive: boolean;
}

export default function UnitStatusBadge({ isActive }: UnitStatusBadgeProps) {
  return (
    <Badge variant={isActive ? "success" : "destructive"}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
