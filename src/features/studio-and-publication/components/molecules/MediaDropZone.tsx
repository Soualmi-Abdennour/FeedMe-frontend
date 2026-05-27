"use client";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { IMediaDropZoneProps } from "../../types/props.types";
import { cn } from "@/utils/shadcn.utils";
import { convertFileToMediaAppModel, countMedia } from "../../utils/media.utils";

function MediaDropZone({ uploadedMedia, setUploadedMedia }: IMediaDropZoneProps) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            setErrorMessage(null);

            if (rejectedFiles.length > 0) {
                setErrorMessage(rejectedFiles[0].errors[0].message);
                return;
            }

            const totalMedia = [...uploadedMedia,...convertFileToMediaAppModel(acceptedFiles)];
            const { imagesNumber, videosNumber } = countMedia(totalMedia);

            if (totalMedia.length > 10) {
                setErrorMessage("Max 10 files allowed");
                return;
            }

            if (imagesNumber > 0 && videosNumber > 0) {
                setErrorMessage("You can't upload both images and videos");
                return;
            }

            if (videosNumber > 1) {
                setErrorMessage("Only one video is allowed");
                return;
            }

            setUploadedMedia(totalMedia);
        },
        [uploadedMedia, setUploadedMedia]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "video/mp4": [".mp4"],
        },
        validator: (file:File) => {
            if (file.size > 10 * 1024 * 1024) {
                return { code: "file-too-large", message: "File must be less than 10MB" };
            }
            return null;
        },
    });

    const isEmpty = uploadedMedia.length === 0;
    const hasVideo = uploadedMedia.some((media) => media.type==="VIDEO");

    // Can add more only if: no video uploaded yet, and under the 10-image limit
    const canLoadMore = !hasVideo && uploadedMedia.length < 10;

    return (
        <div className="w-full flex flex-col items-center justify-center gap-2 mb-3 "
>
            {(isEmpty || canLoadMore) && (
                <div
                    {...getRootProps()}
                    className={cn(
                        "w-full   rounded-xl flex items-center justify-center cursor-pointer overflow-hidden ",
                        isEmpty
                            ? "h-36 border-2 border-dashed border-neutral-300 hover:border-orange-400 transition text-neutral-500 hover:shadow-sm "
                            : "px-5 py-2 m-3 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm",
                        isDragActive && "opacity-70"
                    )}
                >
                    <input {...getInputProps()} />
                    {isEmpty?  (
                        <div className="flex  flex-col items-center gap-1 text-neutral-400">
                            <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M4 16l4-4 4 4 4-6 4 6M4 20h16M4 4h16" />
                            </svg>
                            <span className="text-xs">Add Media</span>
                        </div>
                    ):(
                        <p className="">Add more</p>
                    )}
                </div>
            )}

            {errorMessage && (
                <p className="text-fail-500 text-base text-center">{errorMessage}</p>
            )}
        </div>
    );
}

export default MediaDropZone;