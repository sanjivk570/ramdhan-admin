import { FileImage, FileVideo, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MediaItem } from "../types/media";

interface MediaGalleryProps {
    media?: MediaItem[] | null;
    emptyTitle?: string;
    emptyDescription?: string;
}

export default function MediaGallery({
    media = [],
    emptyTitle = "No media available",
    emptyDescription = "No files have been attached yet.",
}: MediaGalleryProps) {
    const items = [...media].sort((a, b) => {
        if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
    });

    return (
        <div>
            {items.length === 0 ? (
                <div className="rounded-xl border bg-muted/10 p-8 text-center">
                    <FileImage className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 font-medium">{emptyTitle}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                        <div key={item.uuid} className="overflow-hidden rounded-xl border bg-background">
                            <div className="relative aspect-square bg-muted">
                                {item.mime_type.startsWith("image/") && item.url ? (
                                    <img
                                        src={item.url}
                                        alt={item.alt_text || item.title || item.original_name}
                                        className="h-full w-full object-contain"
                                    />
                                ) : item.mime_type.startsWith("video/") && item.url ? (
                                    <video src={item.url} controls className="h-full w-full object-contain" />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        {item.mime_type.startsWith("video/") ? (
                                            <FileVideo className="h-10 w-10 text-muted-foreground" />
                                        ) : (
                                            <FileImage className="h-10 w-10 text-muted-foreground" />
                                        )}
                                    </div>
                                )}

                                {item.is_primary && (
                                    <Badge className="absolute left-3 top-3 gap-1">
                                        <Star className="h-3 w-3 fill-current" />
                                        Primary
                                    </Badge>
                                )}
                            </div>

                            <div className="p-4">
                                <p className="truncate text-sm font-medium">
                                    {item.title || item.original_name}
                                </p>
                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                    {item.original_name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
