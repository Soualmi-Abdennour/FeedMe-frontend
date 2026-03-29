import { VerificationProcessState } from "@/types/props.types";

export const SUBMIT_ONBOARDING_MESSAGES:VerificationProcessState={
    LOADING:{
        dispalyMessage:"Creating your profile please wait...",
        buttonMessage:"Loading..."
    },
    FAIL:{
        dispalyMessage:"Unauthorazied access",
        buttonMessage:"back to sign-in",
    },
    ERROR:{
        dispalyMessage:"Something went wrong please try again",
        buttonMessage:"Try again"
    },
    SUCCESS:{
        dispalyMessage:"Account created successefully, welcome to the app",
        buttonMessage:"Continue",
    },
    DEFAULT:{
        dispalyMessage:"",
        buttonMessage:""
    }

}

