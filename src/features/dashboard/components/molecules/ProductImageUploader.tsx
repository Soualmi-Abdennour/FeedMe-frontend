import React, { useCallback, useState } from 'react'
import { ProductImage } from '../../types/product.types';
import { IProductImageDropZone } from '../../types/props.types';
import { FileRejection, useDropzone } from 'react-dropzone';
import Image from 'next/image';

function ProductImageUploader({profileImage,setProfileImage}:IProductImageDropZone) {
const [errorMessage, setErrorMessage] = useState<string | null>(null);
    console.log(profileImage);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
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
        [setProfileImage]
    );

    const handleRemove = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setProfileImage({
                imageFile:undefined,
                previewUrl:undefined
            });
            setErrorMessage(null);
        },
        [setProfileImage]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
        },
        maxFiles: 1,
        validator: (file: File) => {
            if (file.size > 100 * 1024 * 1024) {
                return { code: "file-too-large", message: "File must be less than 100MB" };
            }
            return null;
        },
    });

    return (
        <div className="relative h-96 ">

        <div
            {...getRootProps()}
            className="w-full h-full border-2 border-dashed border-neutral-300 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-orange-400 transition"
            >
            {profileImage.previewUrl ? (
                <Image
                src={profileImage.previewUrl}
                alt="preview"
                width={100}
                height={100}
                className="w-full h-full object-cover" />
            ) : (
                <div className="flex flex-col items-center gap-1 text-neutral-400">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M4 16l4-4 4 4 4-6 4 6M4 20h16M4 4h16" />
                    </svg>
                    <span className="text-xs">Add image</span>
                </div>
            )}
            <input {...getInputProps()} className="hidden" />
        </div>
            {profileImage.previewUrl  && (
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
            {errorMessage  && (
                <p className="text-red-500 text-xs text-center max-w-[10rem]">{errorMessage}</p>
            )}
        </div>
    )
}

export default ProductImageUploader
