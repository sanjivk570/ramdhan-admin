import { Badge } from "@/components/ui/badge";

export function PurchaseStatusBadge({
    value,
    successValues = ["approved", "posted", "paid"],
    dangerValues = ["cancelled", "void", "rejected"],
}: {
    value: string | null | undefined;
    successValues?: string[];
    dangerValues?: string[];
}) {
    const text = value || "-";
    const lower = text.toLowerCase();
    const variant = successValues.includes(lower)
        ? ("success" as const)
        : dangerValues.includes(lower)
          ? ("destructive" as const)
          : ("secondary" as const);

    return (
        <Badge variant={variant}>
            <span className="capitalize">{text}</span>
        </Badge>
    );
}

export default PurchaseStatusBadge;
