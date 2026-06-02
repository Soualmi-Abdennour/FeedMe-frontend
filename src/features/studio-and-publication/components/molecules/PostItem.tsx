import { Button } from '@/components/ui/button'
import { PostAppModel } from '@/features/studio-and-publication/types/studio.types'; // adjust import path
import Image from 'next/image'
import MultiImageMediaPlayer from '../atoms/MultiImageMediaPlayer'
import SingleImageMediaPlayer from '../atoms/SingleImageMediaPlayer'
import VideoMediaPlayer from '../atoms/VideoxMediaPlayer'
import Link from 'next/link';
import { convertMediaDbModelToMediaAppModel } from '../../utils/media.utils'
import { PostDetailPopup } from './PostDetailPopup'



function PostItem({ post }: { post: PostAppModel }) {
  const { media, user: { userName, role, profile } } = post;

    let profileImage
    if (role === "USER") {
        profileImage = profile?.userBasicInformation.profileImageUrl
    } else {
        profileImage = profile?.restaurantBasicInformation.restaurantLogoUrl
    } 
    const renderMedia = () => {
        if (!media || media.length === 0) return null

        // Single video
        if (post.mediaType === 'VIDEO') {
            return <VideoMediaPlayer media={media} />
        }

    if (media.length > 1) {
      return <MultiImageMediaPlayer mediaList={media} />;
    }

    return <SingleImageMediaPlayer media={media} />;
  };

  return (
    <>
      {/* CARD */}
      <div
        className="relative h-full w-[387px] overflow-hidden rounded-2xl shadow-xl cursor-pointer"
      >
        <div className="absolute inset-0">{renderMedia()}</div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-3 px-4 pb-5">
          {/* <div className="size-10 rounded-full shrink-0">
            <Image
              src={profileImage ?? "/default/default-profile-image.png"}
              alt="/"
              width={40}
              height={40}
              className="object-cover w-full h-full rounded-full"
            />
          </div> */}
{/* 
          <div className="flex-1 overflow-hidden">
             <p className="truncate text-sm font-semibold text-white">
              {userName}
            </p> 

            {post.title && (
              <p className="line-clamp-2 text-xs text-white/70 mt-0.5">
                {post.title}
              </p>
            )}
          </div> */}
        </div>
      </div>

      
    </>
  );
}

export default PostItem;