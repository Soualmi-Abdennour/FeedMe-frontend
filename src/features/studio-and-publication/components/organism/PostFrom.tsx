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
import { Button } from '@/components/ui/button'


function PostForm({ defaultValues,onSubmit,onClose  }: IPostFormProps) {
    const [mediaList, setMediaList] = useState<MediaAppModel[]>(defaultValues?.mediaList?? [])
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
        const { title, description, contentType } = formData
        const postData = buildPostFormData({
            title, description, contentType, mediaList: mediaList
        })
        await onSubmit(postData)
    }
    return (
        <div className='grid grid-cols-1 justify-center w-full '>
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
                <div className="flex gap-3 mt-1">
                    <Button 
                        type='button'
                        variant={"ghost"}
                        onClick={onClose}
                        className="flex-1 py-2 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-50 transition">
                            Cancel
                    </Button>
                    <Button disabled={mediaList.length === 0 || !isValid || !isDirty} 
                        type='submit'
                        className="flex-1 py-2 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition disabled:opacity-60">
                        Create Post
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default PostForm
