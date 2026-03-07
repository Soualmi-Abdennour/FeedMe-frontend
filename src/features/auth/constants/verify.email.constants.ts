import { VerificationProcessState } from "../types/props.types";

export const VERIFY_EMAIL_MESSAGES:VerificationProcessState={
    LOADING:{
        dispalyMessage:"Verifying your Token please wait...",
        buttonMessage:"Verify..."
    },
    FAIL:{
        dispalyMessage:"Invalid Token please use the provided link",
        buttonMessage:"back to sign up"
    },
    ERROR:{
        dispalyMessage:"Something went wrong please try again",
        buttonMessage:"Try again"
    },
    SUCCESS:{
        dispalyMessage:"Email verified successefully",
        buttonMessage:"Continue"
    },
    DEFAULT:{
        dispalyMessage:"Email sent successfully to, please check your inbox",
        buttonMessage:""
    }

}

