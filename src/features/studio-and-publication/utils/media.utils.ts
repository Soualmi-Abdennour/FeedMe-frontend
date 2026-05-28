import { v4 as uuidv4 } from "uuid";
import { MediaAppModel, MediaDbModel } from "../types/media.types";
import { PostFormData } from "../types/studio.types";


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
            if (media.type === "VIDEO") {
                formData.append("video", media.file!); // ✅ فيديو
            } else {
                formData.append("images", media.file!); // ✅ صورة
            }
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
        previewUrl: `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}${media.url}`,
        type: media.type,
        source: "EXISTING"
    }))
}
