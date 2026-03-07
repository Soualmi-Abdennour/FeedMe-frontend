"use client"
import React, { useEffect, useState } from "react";
import SubmitButton from "@/components/atoms/SubmitButton";
import { IVerifyTokenFormProps } from "../../types/props.types";
import { useSendVerificationEmailMutation } from "../../store/auth.api.slice";
import { useAppSelector } from "@/store/base.store";

function VerifyTokenDefaultView({ props }: { props: IVerifyTokenFormProps }) {
    const [cooldown, setCooldown] = useState(60); // start countdown immediately
    const [sendVerificationEmail] = useSendVerificationEmailMutation();
    const { user } = useAppSelector((state) => state.user);

    // Countdown effect
    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setTimeout(() => {
            setCooldown(cooldown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [cooldown]);

    const handleClick = async () => {
        setCooldown(60); // restart cooldown on click
        await sendVerificationEmail(user); // trigger API
    };

    const { displayMessage, buttonMessage, buttonState } = props;

    return (
        <div className="flex flex-col max-w-[500px] mx-auto justify-between items-center min-h-[500px]">
            <h1 className="text-center">{displayMessage}</h1>
            {cooldown > 0 && <h3>Resend the link in: {cooldown} seconds</h3>}
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