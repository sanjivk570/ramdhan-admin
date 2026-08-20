import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { mediaService } from "../services/media.service";
import type { MediaTarget, UpdateMediaPayload, UploadMediaPayload } from "../types/media";

interface MediaVariables {
    target: MediaTarget;
    mediaUuid: string;
}

interface UploadVariables {
    target: MediaTarget;
    payload: UploadMediaPayload;
}

interface UpdateVariables extends MediaVariables {
    payload: UpdateMediaPayload;
}

function invalidateMedia(queryClient: ReturnType<typeof useQueryClient>) {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDIA] });
}

export function useUploadMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ target, payload }: UploadVariables) =>
            mediaService.upload(target, payload),
        onSuccess: () => invalidateMedia(queryClient),
    });
}

export function useUpdateMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ mediaUuid, payload }: UpdateVariables) =>
            mediaService.update(mediaUuid, payload),
        onSuccess: () => invalidateMedia(queryClient),
    });
}

export function useDeleteMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ mediaUuid }: MediaVariables) =>
            mediaService.delete(mediaUuid),
        onSuccess: () => invalidateMedia(queryClient),
    });
}

export function useSetPrimaryMedia() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ mediaUuid }: MediaVariables) =>
            mediaService.setPrimary(mediaUuid),
        onSuccess: () => invalidateMedia(queryClient),
    });
}
