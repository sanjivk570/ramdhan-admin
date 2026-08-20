import { useMemo, useRef, useState } from "react";
import {
    FileImage,
    ImagePlus,
    Pencil,
    Star,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { notification } from "@/lib/notification";
import { useQueryClient } from "@tanstack/react-query";
import type { MediaItem, MediaTarget } from "../types/media";
import {
    useDeleteMedia,
    useSetPrimaryMedia,
    useUpdateMedia,
    useUploadMedia,
} from "../hooks/useMedia";

interface MediaManagerProps {
    target: MediaTarget;
    media?: MediaItem[] | null;
    title?: string;
    description?: string;
    disabled?: boolean;
    allowVideo?: boolean;
    invalidateQueryKeys?: readonly unknown[][];
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/svg+xml";
const VIDEO_ACCEPT = "video/mp4,video/quicktime";

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaManager({
    target,
    media = [],
    title = "Media",
    description = "Upload and manage media files.",
    disabled = false,
    allowVideo = true,
    invalidateQueryKeys = [],
}: MediaManagerProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isPrimaryUpload, setIsPrimaryUpload] = useState(false);
    const [editingUuid, setEditingUuid] = useState<string | null>(null);
    const [editValues, setEditValues] = useState({ title: "", alt_text: "", description: "" });

    const queryClient = useQueryClient();

    const refresh = () => {
        invalidateQueryKeys.forEach((queryKey) => {
            queryClient.invalidateQueries({ queryKey });
        });
    };

    const uploadMutation = useUploadMedia();
    const updateMutation = useUpdateMedia();
    const deleteMutation = useDeleteMedia();
    const primaryMutation = useSetPrimaryMedia();

    const sortedMedia = useMemo(
        () => [...(media ?? [])].sort((a, b) => {
            if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
            return (a.sort_order ?? 0) - (b.sort_order ?? 0);
        }),
        [media]
    );

    const accept = allowVideo ? `${IMAGE_ACCEPT},${VIDEO_ACCEPT}` : IMAGE_ACCEPT;

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const valid: File[] = [];
        const invalid: string[] = [];

        Array.from(files).forEach((file) => {
            const validType = file.type.startsWith("image/") || (allowVideo && file.type.startsWith("video/"));
            if (file.size > MAX_FILE_SIZE) {
                invalid.push(`${file.name}: maximum size is 10 MB`);
                return;
            }
            if (!validType) {
                invalid.push(`${file.name}: unsupported file type`);
                return;
            }
            valid.push(file);
        });

        if (invalid.length) {
            notification.error("Some files were rejected.", invalid.join("\n"));
        }
        setSelectedFiles((current) => [...current, ...valid]);
    };

    const uploadFiles = async () => {
        if (!selectedFiles.length) return;
        try {
            for (let index = 0; index < selectedFiles.length; index += 1) {
                await uploadMutation.mutateAsync({
                    target,
                    payload: {
                        file: selectedFiles[index],
                        is_primary: isPrimaryUpload && index === 0,
                        sort_order: sortedMedia.length + index,
                    },
                });
            }
            refresh();
            notification.success("Media uploaded successfully.", `${selectedFiles.length} file${selectedFiles.length === 1 ? "" : "s"} added.`);
            setSelectedFiles([]);
            setIsPrimaryUpload(false);
            if (inputRef.current) inputRef.current.value = "";
        } catch {
            notification.error("Unable to upload media.", "Please check the selected files and try again.");
        }
    };

    const startEdit = (item: MediaItem) => {
        setEditingUuid(item.uuid);
        setEditValues({
            title: item.title ?? "",
            alt_text: item.alt_text ?? "",
            description: item.description ?? "",
        });
    };

    const saveEdit = async (item: MediaItem) => {
        try {
            await updateMutation.mutateAsync({
                target,
                mediaUuid: item.uuid,
                payload: {
                    title: editValues.title || null,
                    alt_text: editValues.alt_text || null,
                    description: editValues.description || null,
                },
            });
            refresh();
            notification.success("Media updated successfully.", "Media metadata has been updated.");
            setEditingUuid(null);
        } catch {
            notification.error("Unable to update media.", "Please try again.");
        }
    };

    const setPrimary = async (item: MediaItem) => {
        if (item.is_primary) return;
        try {
            await primaryMutation.mutateAsync({ target, mediaUuid: item.uuid });
            refresh();
            notification.success("Primary media updated.", "This file is now the primary media.");
        } catch {
            notification.error("Unable to set primary media.", "Please try again.");
        }
    };

    const deleteMedia = async (item: MediaItem) => {
        if (!window.confirm(`Delete ${item.original_name}?`)) return;
        try {
            await deleteMutation.mutateAsync({ target, mediaUuid: item.uuid });
            refresh();
            notification.success("Media deleted successfully.", "The media has been removed.");
        } catch {
            notification.error("Unable to delete media.", "Please try again.");
        }
    };

    return (
        <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="border-b bg-muted/20 px-6 py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base font-semibold">{title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>
                    <Badge variant="secondary">{sortedMedia.length} file{sortedMedia.length === 1 ? "" : "s"}</Badge>
                </div>
            </div>

            <div className="space-y-6 p-6">
                <div className="rounded-xl border-2 border-dashed bg-muted/10 p-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-3 rounded-full border bg-background p-3">
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium">Add media</h3>
                        <p className="mt-1 max-w-md text-sm text-muted-foreground">
                            Images up to 10 MB{allowVideo ? "; MP4/MOV videos are also supported." : "."}
                        </p>
                        <input
                            ref={inputRef}
                            type="file"
                            accept={accept}
                            multiple
                            className="hidden"
                            disabled={disabled || uploadMutation.isPending}
                            onChange={(event) => handleFiles(event.target.files)}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            disabled={disabled || uploadMutation.isPending}
                            onClick={() => inputRef.current?.click()}
                        >
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Files
                        </Button>
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="rounded-xl border bg-muted/20 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="font-medium">Ready to upload</p>
                                <p className="text-sm text-muted-foreground">{selectedFiles.length} file{selectedFiles.length === 1 ? "" : "s"} selected.</p>
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => setSelectedFiles([])}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="mt-4 space-y-2">
                            {selectedFiles.map((file, index) => (
                                <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => setSelectedFiles((current) => current.filter((_, i) => i !== index))}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={isPrimaryUpload}
                                    onChange={(event) => setIsPrimaryUpload(event.target.checked)}
                                />
                                Make first selected file primary
                            </label>
                            <Button type="button" onClick={uploadFiles} disabled={uploadMutation.isPending}>
                                <Upload className="mr-2 h-4 w-4" />
                                {uploadMutation.isPending ? "Uploading..." : "Upload Media"}
                            </Button>
                        </div>
                    </div>
                )}

                {sortedMedia.length === 0 ? (
                    <div className="rounded-xl border bg-muted/10 p-10 text-center">
                        <FileImage className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-3 font-medium">No media</p>
                        <p className="mt-1 text-sm text-muted-foreground">Add media using the uploader above.</p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                        {sortedMedia.map((item) => (
                            <article key={item.uuid} className="overflow-hidden rounded-xl border bg-background">
                                <div className="relative aspect-square bg-muted">
                                    {item.mime_type.startsWith("image/") && item.url ? (
                                        <img src={item.url} alt={item.alt_text || item.title || item.original_name} className="h-full w-full object-contain" />
                                    ) : item.mime_type.startsWith("video/") && item.url ? (
                                        <video src={item.url} controls className="h-full w-full object-contain" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <FileImage className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    {item.is_primary && (
                                        <Badge className="absolute left-3 top-3 gap-1">
                                            <Star className="h-3 w-3 fill-current" />
                                            Primary
                                        </Badge>
                                    )}
                                </div>

                                <div className="space-y-1 p-2">
                                    <div>
                                        <p className="truncate text-sm font-medium">{item.original_name}</p>
                                        <p className="text-xs text-muted-foreground">{item.mime_type} · {formatBytes(item.size)}</p>
                                    </div>

                                    {editingUuid === item.uuid ? (
                                        <div className="space-y-3">
                                            <Input value={editValues.title} onChange={(event) => setEditValues((value) => ({ ...value, title: event.target.value }))} placeholder="Media title" />
                                            <Input value={editValues.alt_text} onChange={(event) => setEditValues((value) => ({ ...value, alt_text: event.target.value }))} placeholder="Alt text" />
                                            <Textarea value={editValues.description} onChange={(event) => setEditValues((value) => ({ ...value, description: event.target.value }))} placeholder="Description" rows={3} />
                                            <div className="flex justify-end gap-2">
                                                <Button type="button" variant="outline" size="sm" onClick={() => setEditingUuid(null)}>Cancel</Button>
                                                <Button type="button" size="sm" onClick={() => saveEdit(item)} disabled={updateMutation.isPending}>{updateMutation.isPending ? "Saving..." : "Save"}</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-1 text-sm">
                                            <p className="text-muted-foreground">Title: <span className="text-foreground">{item.title || "-"}</span></p>
                                            <p className="text-muted-foreground">Alt: <span className="text-foreground">{item.alt_text || "-"}</span></p>
                                        </div>
                                    )}

                                    {editingUuid !== item.uuid && (
                                        <div className="flex items-center justify-between gap-2 border-t pt-3">
                                            <div className="flex items-center gap-1">
                                                <Button type="button" variant="ghost" size="sm" onClick={() => startEdit(item)}>
                                                    <Pencil className="mr-1 h-4 w-4" /> Edit
                                                </Button>
                                                {!item.is_primary && (
                                                    <Button type="button" variant="ghost" size="sm" disabled={primaryMutation.isPending} onClick={() => setPrimary(item)}>
                                                        <Star className="mr-1 h-4 w-4" /> Primary
                                                    </Button>
                                                )}
                                            </div>
                                            <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={deleteMutation.isPending} onClick={() => deleteMedia(item)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
