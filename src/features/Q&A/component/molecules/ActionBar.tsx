"use client"
import { Icon } from "@/components/atoms/Icon"
import { Bookmark, Check, } from "lucide-react";
import { TextLabel } from "../atoms/TextLabel";
import { IActionBarProps } from "../../types/props.types";
import { useState } from "react";
import { useToggleQuestionLikeMutation, useToggleQuestionSaveMutation } from "../../store/qa.api.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { LikeResponse } from "@/types/api.types";



export  function ActionBar({
  likes,
  answers = 0,
  onAnswer,
  isLiked: isAlreadyLiked = false,
  isSaved:isAlreadySaved = false,
  questionId
}: IActionBarProps) {  
  const [isLiked, setIsLiked] = useState<boolean>(isAlreadyLiked)
  const [likeCount,setLikeCount]=useState<number>(likes)
  const [isSaved, setIsSaved] = useState<boolean>(isAlreadySaved)
  const [toggleSave]=useToggleQuestionSaveMutation()
  
    const [toggleLike] = useToggleQuestionLikeMutation();
  const handleLike = async () => {
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(!previousIsLiked);
    setLikeCount(prev => prev + (previousIsLiked ? -1 : 1));

    const fetchResponse = await toggleLike(questionId);
    const error = fetchResponse.error as FetchBaseQueryError;
    const successResponse = fetchResponse.data as LikeResponse;

    if (error) {
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      return;
    }

    const serverIsLiked = successResponse?.data?.isLiked;
    if (serverIsLiked !== undefined && serverIsLiked !== !previousIsLiked) {
      setIsLiked(serverIsLiked);
      setLikeCount(prev => prev + (serverIsLiked ? 1 : -1));
    }
  };
  const handleSave = async () => {
    const previousIsSaved = isSaved;
    setIsSaved(!previousIsSaved);
    const fetchResponse = await toggleSave(questionId);
    const error = fetchResponse.error as FetchBaseQueryError;
    const successResponse = fetchResponse.data as LikeResponse;

    if (error) {
      setIsSaved(previousIsSaved);
      return;
    }

    const serverIsSaved = successResponse?.data?.isLiked;
    if (serverIsSaved !== undefined && serverIsSaved !== !previousIsSaved) {
      setIsSaved(serverIsSaved);
    }
  };
  return (
    <div className="flex items-center gap-6 py-2 mt-3 border-t border-gray-700">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 hover:text-orange-500 transition-colors ${isLiked ? 'text-orange-500' : 'text-gray-400'}`}
      >
        <Icon
        name="heart"
        filled={isLiked}
        color={isLiked ? "red" : "gray"}
        />
        
        <TextLabel variant="small" className={isLiked ? "text-orange-500" : "text-gray-400"}>{likeCount}</TextLabel>
      </button>

      {/* Ansewr Button */}
      {answers !== undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAnswer?.();
          }}
          className="flex items-center gap-2 hover:text-orange-500 transition-colors text-gray-400"
        >
          {/* <Icon name="comment" /> */}
          <TextLabel variant="small" className="text-gray-400">View answers ({answers})</TextLabel>
        </button>
      )}

      {/* Reply Button */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
            isSaved
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-[#FFF8F4] text-[#5C4338] border-[#F1D8CC] hover:bg-[#FFEFE6]"
          }`}
        >
          {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
<span>{isSaved ? "Reply Later" : "Reply Later"}</span> 
      </button>
    </div>
  );
}
