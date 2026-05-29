"use client";
import { cn } from "@/utils/shadcn.utils";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { IProfileImageDropZone } from "../../types/props.types";
import Image from "next/image";

function ProfileImageDropZone({ profileImage, setProfileImage, disabled = false }: IProfileImageDropZone) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const hasValidImage = Boolean(profileImage && profileImage.previewUrl);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (disabled) return;
            setErrorMessage(null);

            if (rejectedFiles.length > 0) {
                setErrorMessage(rejectedFiles[0].errors[0].message);
                return;
            }

            if (acceptedFiles.length === 0) return;

            setProfileImage({
                previewUrl: URL.createObjectURL(acceptedFiles[0]),
                imageFile: acceptedFiles[0],
            });
        },
        [setProfileImage, disabled]
    );

    const handleRemove = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (disabled) return;
            setProfileImage({
                imageFile:undefined,
                previewUrl:undefined
            });
            setErrorMessage(null);
        },
        [setProfileImage, disabled]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxFiles: 1,
        validator: (file: File) => {
            if (file.size > 10 * 1024 * 1024) {
                return { code: "file-too-large", message: "File must be less than 10MB" };
            }
            return null;
        },
    });
    console.log(profileImage.previewUrl);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative size-40 shrink-0">
                <div
                    {...getRootProps()}
                    className={cn(
                        "size-full rounded-full flex items-center justify-center overflow-hidden transition-all duration-200",
                        // ── no image, enabled ──
                        !hasValidImage && !disabled && [
                            "border-2 border-dashed border-neutral-300",
                            "bg-white text-neutral-400",
                            "cursor-pointer",
                            "hover:border-orange-400 hover:text-orange-400 hover:shadow-md",
                        ],
                        // ── no image, disabled ──
                        !hasValidImage && disabled && [
                            "border-2 border-dashed border-neutral-200",
                            "bg-neutral-50 text-neutral-300",
                            "cursor-not-allowed",
                        ],
                        // ── has image, enabled ──
                        hasValidImage && !disabled && [
                            "ring-2 ring-orange-400",
                            "cursor-pointer",
                            "hover:ring-orange-500 hover:ring-offset-2",
                        ],
                        // ── has image, disabled ──
                        hasValidImage && disabled && [
                            "ring-2 ring-neutral-300",
                            "opacity-60 grayscale",
                            "cursor-not-allowed",
                        ],
                        // ── drag active ──
                        isDragActive && !disabled && "opacity-70 scale-95",
                    )}
                >
                    <input {...getInputProps()} />

                    {hasValidImage ? (
                        <Image
                            src={profileImage.previewUrl!}
                            alt="Profile image"
                            width={160}
                            height={160}
                            className="size-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 select-none pointer-events-none">
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <span className="text-xs">
                                {disabled ? "No image" : "Upload Image"}
                            </span>
                        </div>
                    )}
                </div>

                {hasValidImage && !disabled && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute bottom-1 right-1 size-6 rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors duration-150"
                        aria-label="Remove profile image"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {errorMessage && !disabled && (
                <p className="text-red-500 text-xs text-center max-w-[10rem]">{errorMessage}</p>
            )}
        </div>
    );
}

export default ProfileImageDropZone;