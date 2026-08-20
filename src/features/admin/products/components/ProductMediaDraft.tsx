import { MediaUploader } from "@/features/admin/media";

interface ProductMediaDraftProps {
    files: File[];
    onChange: (files: File[]) => void;
    disabled?: boolean;
}

export default function ProductMediaDraft({ files, onChange, disabled = false }: ProductMediaDraftProps) {
    return (
        <MediaUploader
            files={files}
            onChange={onChange}
            disabled={disabled}
            allowVideo={true}
            maxFiles={10}
        />
    );
}
