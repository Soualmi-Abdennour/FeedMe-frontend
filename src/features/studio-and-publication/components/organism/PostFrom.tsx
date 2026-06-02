"use client"
import FormField from '@/components/molecules/FormField'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { POST_FORM_FIELDS } from '../../constants/postForm.constants'
import { IPostFormSchema, postFormSchema } from '../../schema/postForm.schema'
import { useUploadVideoMutation } from '../../store/studio.api.slice'
import { MediaAppModel } from '../../types/media.types'
import { IPostFormProps } from '../../types/props.types'
import { buildPostFormData, buildVideoUploadFormData, isSameMediaArray } from '../../utils/media.utils'
import MediaDropZone from '../molecules/MediaDropZone'
import MediaPreviewGallery from '../molecules/MediaPreviewGallery'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'sonner'


function PostForm({ defaultValues, onSubmit, onClose, isVideoUploading, setIsVideoUploading }: IPostFormProps) {
    const [mediaList, setMediaList] = useState<MediaAppModel[]>(defaultValues?.mediaList?? [])
    const [uploadVideo]=useUploadVideoMutation()
    const {
        handleSubmit,
        control,
        formState: {
            errors,
            isValid,
            isDirty
        }
    } = useForm<IPostFormSchema>({
        resolver: zodResolver(postFormSchema),
        mode: "onChange",
        defaultValues:defaultValues? defaultValues:{
            title:"",
            description:"",
            // contentType:""
        }
    })
    const submitForm =async (formData: IPostFormSchema) => {
        setIsVideoUploading(true)       
        const { title, description, contentType } = formData
        const postData = buildPostFormData({
            title, description, contentType, mediaList: mediaList
        })
        if (mediaList[0].file?.type.startsWith("video/")){     
            const fetchResponse=await uploadVideo(buildVideoUploadFormData(mediaList[0].file))
            const error: FetchBaseQueryError =fetchResponse.error as FetchBaseQueryError
            const videoUrl = fetchResponse.data?.secure_url            
            if(error || !videoUrl){
                toast.error("Something Went Wrong")
                setIsVideoUploading(false)
                return
            }
            else {
                postData.append("videoUrl", videoUrl)
            }
        }
        await onSubmit(postData)
        setIsVideoUploading(false)
    }
    return (
        <div className='grid grid-cols-2 gap-20 justify-center w-full  '>
            <div className='items-start gap-20 justify-center grid grid-cols-1'>
                <div className='grid grid-cols-1 items-start'>
                    {mediaList && (
                <MediaPreviewGallery uploadedMedia={mediaList} setUploadedMedia={setMediaList} className=''/>
            )} 
                </div> 
            <div className='grid grid-cols-1  '>
                <MediaDropZone uploadedMedia={mediaList} setUploadedMedia={setMediaList}/>
            </div>
                
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                {POST_FORM_FIELDS.map((formField) => (
                    <div key={formField.name}>
                        <FormField {...formField} control={control} errors={errors} />
                    </div>
                ))}
                <div className="flex gap-3 mt-1">
                    <Button 
                        type='button'
                        variant={"ghost"}
                        onClick={onClose}
                        className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition">
                            Cancel
                    </Button>
                    <Button 
                        disabled={mediaList.length === 0 || !isValid || (!isDirty && isSameMediaArray(mediaList,defaultValues?.mediaList ??[]))} 
                        type='submit'
                        className="flex-1 py-2 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition disabled:opacity-60">
                        {defaultValues? "Edit Post" :"Create Post"}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default PostForm
