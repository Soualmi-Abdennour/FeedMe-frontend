import { VerificationProcessState } from "@/types/props.types";

export const VERIFY_EMAIL_MESSAGES:VerificationProcessState={
    LOADING:{
        dispalyMessage:"Please wait a little while!",
        buttonMessage:"Verify..."
    },
    FAIL:{
        dispalyMessage:"The operation failed, please verify your information.",
        buttonMessage:"Try Again",
    },
    ERROR:{
        dispalyMessage:"Sorry, there must have been an error in transferring the information. Please try again.",
        buttonMessage:"Try Again"
    },
    SUCCESS:{
        dispalyMessage:"Email verified successefully",
        buttonMessage:"Continue",
    },
    DEFAULT:{
        dispalyMessage:"Email sent successfully to ${email} please check your inbox",
        buttonMessage:""
    }
} as const

