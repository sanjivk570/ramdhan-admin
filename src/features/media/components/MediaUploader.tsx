import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notification } from "@/lib/notification";

interface MediaUploaderProps {
    files: File[];
    onChange: (files: File[]) => void;
    disabled?: boolean;
    allowVideo?: boolean;
    maxFiles?: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function MediaUploader({
    files,
    onChange,
    disabled = false,
    allowVideo = true,
    maxFiles = 10,
}: MediaUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const accept = allowVideo
        ? "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,video/mp4,video/quicktime"
        : "image/jpeg,image/png,image/webp,image/gif,image/svg+xml";

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        const valid: File[] = [];
        const invalid: string[] = [];

        Array.from(fileList).forEach((file) => {
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

        const merged = [...files, ...valid].slice(0, maxFiles);
        onChange(merged);

        if ([...files, ...valid].length > maxFiles) {
            notification.error("Maximum files reached.", `You can select up to ${maxFiles} files.`);
        }

        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-4 rounded-xl border bg-muted/10 p-5">
            <div className="flex items-start gap-3">
                <div className="rounded-lg border bg-background p-2">
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Product images</p>
                    <p className="text-sm text-muted-foreground">
                        Add catalog images before saving. Files are uploaded automatically after the product is created.
                    </p>
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple
                className="hidden"
                disabled={disabled}
                onChange={(event) => handleFiles(event.target.files)}
            />

            <Button type="button" variant="outline" disabled={disabled} onClick={() => inputRef.current?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" />
                Add Images
            </Button>

            {files.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {files.map((file, index) => {
                        const preview = URL.createObjectURL(file);
                        return (
                            <div key={`${file.name}-${index}`} className="relative overflow-hidden rounded-lg border bg-background">
                                {file.type.startsWith("image/") ? (
                                    <img src={preview} alt={file.name} className="aspect-square w-full object-cover" onLoad={() => URL.revokeObjectURL(preview)} />
                                ) : (
                                    <div className="flex aspect-square items-center justify-center text-sm text-muted-foreground">Video</div>
                                )}
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 rounded-full bg-background/90 p-1 shadow"
                                    onClick={() => onChange(files.filter((_, fileIndex) => fileIndex !== index))}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <div className="truncate border-t px-3 py-2 text-xs">{file.name}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
