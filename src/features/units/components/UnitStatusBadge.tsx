import { Badge } from "@/components/ui/badge";

interface UnitStatusBadgeProps {
  isActive: boolean;
}

export default function UnitStatusBadge({ isActive }: UnitStatusBadgeProps) {
  return (
    <Badge variant={isActive ? "default" : "secondary"}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
