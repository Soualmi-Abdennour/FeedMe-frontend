import { v4 as uuidv4 } from "uuid";
import { MediaAppModel, MediaDbModel } from "../types/media.types";
import { PostFormData } from "../types/studio.types";
import { UploadVideoPayload } from "@/types/api.types";


export function countMedia(mediaList: MediaAppModel[]) {
    let imagesNumber = 0;
    let videosNumber = 0;

    for (const media of mediaList) {
        if (media.type === "IMAGE") {
            imagesNumber++;
        } else if (media.type === "VIDEO") {
            videosNumber++;
        }
    }

    return { imagesNumber, videosNumber };
}

export function getMediaType(mediaList: MediaAppModel[]): string {
    return mediaList[0].type === "VIDEO" ? "VIDEO" : mediaList.length > 1 ? "MULTI_IMAGE" : "IMAGE"
}

export function buildPostFormData(data: PostFormData): FormData {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("contentType", data.contentType);

    const keptMediaIds: string[] = [];

    data.mediaList!.forEach((media) => {
        if (media.source === "NEW") {
            formData.append("images", media.file!); // ✅ صورة
        } else {
            keptMediaIds.push(media.id);
        }
    });

    formData.append("keptMediaIds", JSON.stringify(keptMediaIds));

    return formData;
}

export function convertFileToMediaAppModel(files: File[]): MediaAppModel[] {
    return files.map((file) => ({
        file,
        type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        id: uuidv4(),
        previewUrl: URL.createObjectURL(file),
        source: "NEW"
    }))
}

export function convertMediaDbModelToMediaAppModel(mediaList: MediaDbModel[]): MediaAppModel[] {
    return mediaList.map((media) => ({
        id: media.id,
        previewUrl: media.url,
        type: media.type,
        source: "EXISTING"
    }))
}

export function buildVideoUploadFormData(file: File): UploadVideoPayload {
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("resource_type", "video");
    return { formData, cloudName: CLOUD_NAME };
}

export function isSameMediaArray(
    arr1: MediaAppModel[],
    arr2: MediaAppModel[]
) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const urls2 = new Set(arr2.map(item => item.previewUrl));

    return arr1.every(item => urls2.has(item.previewUrl));
}