import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const { pathname } = useLocation();

    const items = pathname
        .split("/")
        .filter(Boolean);

    if (items.length === 0) {
        return (
            <span className="text-sm text-muted-foreground">
                Dashboard
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            <span>Dashboard</span>

            {items.map((item, index) => (
                <span key={index}>
                    / {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
            ))}
        </div>
    );
}