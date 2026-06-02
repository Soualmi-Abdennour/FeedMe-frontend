import Image from "next/image";
import { MediaAppModel } from "../../types/media.types";

function SingleImageMediaPlayer({ media }: { media: MediaAppModel[] }) {
    const image=media[0]
    return (
        <div className="relative h-full w-full bg-black ">
            <Image
                src={image.previewUrl}
                alt="post image"
                fill
                className="object-contain"
                sizes="387px"
            />
        </div>
    )
}

export default SingleImageMediaPlayer