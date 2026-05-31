"use client"
import SubmitButton from '@/components/atoms/SubmitButton'
import FormField from '@/components/molecules/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { IProductFormProps } from '../../types/props.types'
import { IProductFormSchema, productFormSchema } from '../../schema/product.schema'
import { PRODUCT_FORM_FIELDS } from '../../store/productForm.constants'
import { ProductImage } from '../../types/product.types'
import ProductImageUploader from './ProductImageUploader'


function ProductForm({ editProduct, onSubmit, onClose, isLoading,isOpen }: IProductFormProps) {    
    const [profileImage, setProfileImage] = useState<ProductImage>({
            previewUrl:editProduct?.imageUrl,
            imageFile: undefined
        })
    const {
        handleSubmit,
        control,
        formState: {
            errors,
            isValid,
            isDirty,
        }
    } = useForm<IProductFormSchema>({
        resolver: zodResolver(productFormSchema),
        mode: "onChange",
        defaultValues: editProduct ? {
            name: editProduct.name,
            preparationTime: editProduct.preparationTime,
            description: editProduct.description,
            price: editProduct.price,
            category: editProduct.category
        } : {
            name: "",
            description: "",
            preparationTime: 10,
            price: 100,
            // category:"DESSERTS_AND_SWEETS"
        }
    })
    const submitForm = async (formData: IProductFormSchema) => {

        await onSubmit({...formData,image:profileImage.imageFile!})
    }
    if (!isOpen) return null;

    return (
<div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/60 backdrop-blur-sm">
            <div className="bg-white relative rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">
                <h2 className="text-base font-bold text-neutral-800">
                    {editProduct ? "Edit product:" : "Add product:"}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-neutral-900 text-xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>
                <ProductImageUploader profileImage={profileImage} setProfileImage={setProfileImage}></ProductImageUploader>
                <form onSubmit={handleSubmit(submitForm)}>
                    {PRODUCT_FORM_FIELDS.map((formField) => (
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
                        disabled={!isValid || !isDirty || isLoading || !profileImage.previewUrl}
                        type='submit'
                        className="flex-1 py-2 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition disabled:opacity-60">
                        {isLoading ? "Saving…" : "Apply"}
                    </Button>
            </div>
                </form>
            </div>
        </div>

        // <div className='grid grid-cols-1 justify-center w-full '>
            
        // </div>
    )
}

export default ProductForm
