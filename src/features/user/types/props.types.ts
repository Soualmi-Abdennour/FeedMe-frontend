
export type IVerifyEmailMessageState="LOADING"|"ERROR"|"SUCCESS"
export interface IEmailVerificationState {
    isSuccess:boolean;
    isLoading:boolean;
    isError:boolean
}