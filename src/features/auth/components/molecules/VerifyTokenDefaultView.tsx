"use client"
import SubmitButton from "@/components/atoms/SubmitButton";
import { useAppSelector } from "@/store/base.store";
import { UserResponse } from "@/types/api.types";
import { IDefaultVerificationProcessProps } from "@/types/props.types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSendVerificationEmailMutation } from "../../store/auth.api.slice";

function VerifyTokenDefaultView({ props }: { props: IDefaultVerificationProcessProps }) {
    
    const [cooldown, setCooldown] = useState(10); // start countdown immediately
    const [sendVerificationEmail] = useSendVerificationEmailMutation();
    const { user } = useAppSelector((state) => state.user);
    const { displayMessage, buttonMessage, buttonState ,resendVerificationEndpoint} = props;

    const displayMessageWithEmail:string[]=displayMessage.split("${email}")
    // Countdown effect
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setTimeout(() => {
            setCooldown(cooldown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleClick = async () => {
        
        setCooldown(10); // restart cooldown on click
        const fetchResponse=await sendVerificationEmail({
            identifier:user?.email!,
            endpoint:resendVerificationEndpoint!
        })
        const error:FetchBaseQueryError=fetchResponse.error as FetchBaseQueryError
        const successResponse:UserResponse=fetchResponse.data as UserResponse
        
        if(error){
            const errorResponse=error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
        }
    };


    return (
        <div className="flex flex-col max-w-[500px] mx-auto justify-between items-center min-h-[500px]">
            <h1 className="text-center">
                {displayMessageWithEmail[0]}
                <span className="bg-red-500">{user?.email}</span>
                {displayMessageWithEmail[1]}
            </h1>
            {cooldown > 0 && <h2>Resend the link in: {cooldown} seconds</h2>}
            <SubmitButton
                disabled={cooldown > 0}
                state={"ERROR"}
                onClick={handleClick}
            >
                Resend Link
            </SubmitButton>
        </div>
    );
}

export default VerifyTokenDefaultView;