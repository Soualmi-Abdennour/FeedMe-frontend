'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { PostAppModel } from '@/features/studio-and-publication/types/studio.types';
import VideoMediaPlayer from '../atoms/VideoxMediaPlayer';
import SingleImageMediaPlayer from '../atoms/SingleImageMediaPlayer';
import MultiImageMediaPlayer from '../atoms/MultiImageMediaPlayer';


interface PostDetailPopupProps {
  post: PostAppModel;
}

export function PostDetailPopup({ post }: PostDetailPopupProps) {
  const { title, description, mediaType, media, user } = post;









  const renderMedia = () => {
    if (!media || media.length === 0) return null;

    if (post.mediaType === 'VIDEO') {
      return <VideoMediaPlayer media={media} />;
    }

    if (media.length > 1) {
      return <MultiImageMediaPlayer mediaList={media} />;
    }
console.log("Rendering single image media player with media:");
    return <SingleImageMediaPlayer media={media} />;
  };




return (
  <>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/40 z-40" />

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex gap-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* MEDIA */}
        <div className="flex-1 bg-white flex items-center justify-center p-4 ">
          <div className="w-full h-[400px] rounded-2xl overflow-hidden">
            {renderMedia()}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto max-h-[500px] ">

          {/* Title */}
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-sm font-bold text-gray-800">Title:</p>
            <p className="text-sm text-gray-600 mt-1 break-words">
              {title || '—'}
            </p>
          </div>

          {/* Description */}
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-sm font-bold text-gray-800">Description:</p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words whitespace-pre-wrap">
              {description || '—'}
            </p>
          </div>

          {/* Content type */}
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-sm font-bold text-gray-800">Content type:</p>
            <p className="text-sm text-gray-600 mt-1">
              {mediaType}
            </p>
          </div>

        </div>

      </div>
    </div>
  </>
);

}