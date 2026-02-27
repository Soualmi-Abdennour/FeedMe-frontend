import SubmitButton from '@/components/atoms/SubmitButton'
import { ISubmitButton } from '@/types/props.types'
import { useRouter } from 'next/navigation'


function VerifyEmailTokenSubmitButton({ state }: { state: ISubmitButton["state"] }) {
    const router=useRouter()
    const getButtonTextByState = () => {
        if (state === "LOADING")
            return "Process..."
        if (state === "SUCCESS")
            return "Next"
        if (state === "ERROR")
            return "Try again."
    }
    return (
        <SubmitButton
            state={state}
            disabled={state==="LOADING"}
            onClick={()=>{
                router.replace("/content")
            }}
        >
            {getButtonTextByState()}
        </SubmitButton>
    )
}

export default VerifyEmailTokenSubmitButton
