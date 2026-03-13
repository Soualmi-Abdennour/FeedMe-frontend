import { VerificationProcessState } from "../../../types/props.types";

export const VERIFY_PASSWORD_MESSAGES:VerificationProcessState={
    LOADING:{
        dispalyMessage:"Verifying your Token please wait...",
        buttonMessage:"Verify..."
    },
    FAIL:{
        dispalyMessage:"Invalid Token please use the provided link",
        buttonMessage:"back to forget password",
        redirectTo:"/forget-password"
    },
    ERROR:{
        dispalyMessage:"Something went wrong please try again",
        buttonMessage:"Try again"
    },
    SUCCESS:{
        dispalyMessage:"Link verified successefully",
        buttonMessage:"Continue",
        redirectTo:"/reset-password?verifiedToken=${verifiedToken}"
    },
    DEFAULT:{
        dispalyMessage:"Email sent successfully to ${email} please check your inbox",
        buttonMessage:""
    }
} as const

