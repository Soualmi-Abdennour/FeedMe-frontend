import { ISubmitButton } from '@/types/props.types'
import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/utils/shadcn.utils'
import { Check, ChevronRight, Loader, RotateCw } from 'lucide-react'


function SubmitButton({
    state="DEFAULT",
    children,
    disabled=false,
    className,
    onClick
}:ISubmitButton) {
    const getIconByState=()=>{
        if(state==="LOADING")
            return <Loader className='animate-spin size-8'></Loader>
        if(state==="FAIL")
            return <ChevronRight className='size-8'></ChevronRight>
        if(state==="SUCCESS") 
            return <Check className='size-8'></Check>
        if(state==="ERROR")
            return <RotateCw className='size-8'></RotateCw>
        else 
            return <ChevronRight className='size-8'></ChevronRight>
    }

    return (
        <Button
            disabled={disabled}
            type='submit'
            variant='primary'
            className={cn("flex gap-1 items-center",className)}
            onClick={onClick}
        >
            {children}
            {getIconByState()}
        </Button>
    )
}

export default SubmitButton
