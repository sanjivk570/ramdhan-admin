import { Badge } from "@/components/ui/badge";

interface Props {
  quantity: number;
  lowStockThreshold: number;
}

export default function InventoryStatusBadge({
  quantity,
  lowStockThreshold,
}: Props) {
  if (quantity <= 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }

  if (quantity <= lowStockThreshold) {
    return <Badge variant="secondary">Low Stock</Badge>;
  }

  return <Badge variant="default">In Stock</Badge>;
}
