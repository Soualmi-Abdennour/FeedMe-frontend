"use client"
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/atoms/SubmitButton";
import { useSendVerificationEmailMutation } from "../../store/auth.api.slice";
import { useAppSelector } from "@/store/base.store";
import { IVerificationProps } from "@/types/props.types";

function VerifyTokenDefaultView({ props }: { props: IVerificationProps }) {
    
    const [cooldown, setCooldown] = useState(10); // start countdown immediately
    const [sendVerificationEmail] = useSendVerificationEmailMutation();
    const { user } = useAppSelector((state) => state.user);
    const { displayMessage, buttonMessage, buttonState ,resendVerificationEndpoint} = props;

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
        
        
        await sendVerificationEmail({
            identifier:user?.email!,
            endpoint:resendVerificationEndpoint!
        }); // trigger API
    };


    return (
        <div className="flex flex-col max-w-[500px] mx-auto justify-between items-center min-h-[500px]">
            <h1 className="text-center">
                {displayMessage[0]}
                <span>{user?.email}</span>
                {displayMessage[1]}
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