"use client"
import SubmitButton from "@/components/atoms/SubmitButton";
import { UserResponse } from "@/types/api.types";
import { IDefaultVerificationProcessProps } from "@/types/props.types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSendVerificationEmailMutation } from "../../store/auth.api.slice";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function VerifyTokenDefaultView({ props }: { props: IDefaultVerificationProcessProps }) {
    const [cooldown, setCooldown] = useState(10); // start countdown immediately
    const [sendVerificationEmail] = useSendVerificationEmailMutation();
    const { displayMessage,identifier, buttonMessage, buttonState, resendVerificationEndpoint ,fallBack} = props;

    const displayMessageWithEmail: string[] = displayMessage.split("${email}")
    // Countdown effect
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setTimeout(() => {
            setCooldown(cooldown - 1);
        }, 1500);

        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleClick = async () => {

        setCooldown(15); // restart cooldown on click
        const fetchResponse = await sendVerificationEmail({
            identifier,
            endpoint: resendVerificationEndpoint!
        })
        const error: FetchBaseQueryError = fetchResponse.error as FetchBaseQueryError
        const successResponse: UserResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            if (!errorResponse || errorResponse.status === "ERROR") {
                toast.error("Something Went wrong.")
            }
            else {
                toast.error(errorResponse.errors?.at(0)?.message ?? errorResponse.message)
            }
        }
        else {
            toast.success(successResponse.message)
        }
    };


    return (
        <div className="max-w-[440px] min-h-[620px]  m-auto py-10 w-full flex flex-col relative gap-5">

            <div className="relative max-w-[440px] justify-center min-h-[520px] shadow-1 pt-[80px] pb-[130px] px-auto rounded-tl-[32px] rounded-br-[32px] overflow-hidden">
                <Image
                    src={'auth/bck-form.svg'}
                    fill
                    alt='bck'
                    className='absolute inset-0 object-cover top-0 left-0 -z-10  rounded-tl-[32px] rounded-br-[32px]'
                ></Image>
                <div className="flex flex-col justify-center items-center mx-10   ">
                    <h3>Check your email ?</h3>
                    <p className="text-center text-neutral-500 pb-20 pt-15 ">
                        {displayMessageWithEmail[0]}
                        <span className="text-fail-500 font-bold">{identifier}</span>
                        {displayMessageWithEmail[1]}
                    </p>
                    {cooldown > 0 && <p className="mb-4">Resend the link in: {cooldown} seconds</p>}
                    <SubmitButton
                        disabled={cooldown > 0}
                        state={buttonState}
                        onClick={handleClick}
                        className="w-full mb-5"
                    >
                        Resend Link
                    </SubmitButton>
                    <Link href={fallBack.fallBackRedirectUrl} className="w-full">
                        <Button className="w-full text-white font-bold ">
                            {fallBack.fallBackButtonLabel}
                        </Button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default VerifyTokenDefaultView;