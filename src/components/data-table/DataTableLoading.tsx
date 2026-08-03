import { Skeleton } from "@/components/ui/skeleton";

interface DataTableLoadingProps {
    columns: number;
    rows?: number;
}

export default function DataTableLoading({
    columns,
    rows = 10,
}: DataTableLoadingProps) {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array.from({ length: columns }).map((_, columnIndex) => (
                        <td
                            key={columnIndex}
                            className="border-b p-3"
                        >
                            <Skeleton className="h-5 w-full" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}