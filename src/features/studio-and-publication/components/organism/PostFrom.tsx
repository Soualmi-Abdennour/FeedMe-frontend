"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { POST_FORM_FIELDS } from '../../constants/postForm.constants'
import { IPostFormSchema, postFormSchema } from '../../schema/postForm.schema'
import { MediaAppModel } from '../../types/media.types'
import { IPostFormProps } from '../../types/props.types'
import { buildPostFormData } from '../../utils/media.utils'
import MediaDropZone from '../molecules/MediaDropZone'
import MediaPreviewGallery from '../molecules/MediaPreviewGallery'


function PostForm({ defaultValues,onSubmit  }: IPostFormProps) {
    const [mediaList, setMediaList] = useState<MediaAppModel[]>(defaultValues?.mediaList?? [])
    const {
        handleSubmit,
        control,
        formState: {
            errors,
            isValid
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
        const { title, description, contentType } = formData
        const postData = buildPostFormData({
            title, description, contentType, mediaList: mediaList
        })

        await onSubmit(postData)
    }
    return (
        <div className='grid grid-cols-1 justify-center '>
            {mediaList && (
                <MediaPreviewGallery uploadedMedia={mediaList} setUploadedMedia={setMediaList} className=''/>
            )}
            <MediaDropZone uploadedMedia={mediaList} setUploadedMedia={setMediaList} />
            <form onSubmit={handleSubmit(submitForm)}>
                {POST_FORM_FIELDS.map((formField) => (
                    <div key={formField.name}>
                        <FormField {...formField} control={control} errors={errors} />
                    </div>
                ))}
                <SubmitButton disabled={mediaList.length === 0 || !isValid}  className='text-white font-bold w-full' >
                    Create Post
                </SubmitButton>
            </form>
        </div>
    )
}

export default PostForm
