"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/base.store"
import { useDeactivateAccountMutation, useDeleteAccountMutation } from "../../store/user.api.slice"
import { clearUser } from "../../store/user.slice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { UserResponse } from "@/types/api.types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, ShieldAlert, Trash2 } from "lucide-react"

type ModalType = "deactivate" | "delete" | null

interface Props {
    endpoint: "user" | "restaurant"
}

function DangerZoneSection({ endpoint }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [activeModal, setActiveModal] = useState<ModalType>(null)

    const [deactivateAccount, { isLoading: isDeactivating }] = useDeactivateAccountMutation()
    const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation()

    const handleDeactivate = async () => {
        const fetchResponse = await deactivateAccount({ endpoint })
        const error = fetchResponse.error as FetchBaseQueryError
        const successResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something went wrong.")
            } else {
                toast.error(errorResponse.message)
            }
        } else {
            toast.success(successResponse.message)
            dispatch(clearUser())
            router.push("/")
        }
        setActiveModal(null)
    }

    const handleDelete = async () => {
        const fetchResponse = await deleteAccount({ endpoint })
        const error = fetchResponse.error as FetchBaseQueryError
        const successResponse = fetchResponse.data as UserResponse

        if (error) {
            const errorResponse = error.data as UserResponse
            if (errorResponse.status === "ERROR") {
                toast.error("Something went wrong.")
            } else {
                toast.error(errorResponse.message)
            }
        } else {
            toast.success(successResponse.message)
            dispatch(clearUser())
            router.push("/")
        }
        setActiveModal(null)
    }

    return (
        <>
            <div className="p-4 rounded-lg border border-fail-500 bg-white shadow-1 shadow-fail-400 flex flex-col gap-4">
                <h3 className="text-fail-500 font-semibold flex items-center text-2xl gap-2">
                    <ShieldAlert className="size-5" />
                    Danger Zone
                </h3>
                <div className="flex items-start justify-between gap-4">
                    <Button
                        type="button"
                        value='fail'
                        className="bg-transparent text-left justify-start text-fail-500 hover:bg-fail-200 shrink-0 w-full"
                        onClick={() => setActiveModal("deactivate")}
                    >
                        <div className="flex flex-col gap-4">
                        <div className="flex gap-1">
                            <LogOut></LogOut>
                            <span className="text-sm font-medium">Deactivate account</span>
                        </div>
                        
                        <span className="text-xs text-neutral-500">Temporarily disable your account.</span>
                    </div>
                    </Button>
                </div>
                <div className="border-t border-fail-200" />
                <div className="flex items-start justify-between gap-4">
                    <Button
                        type="button"
                        variant='fail'
                        className="border-fail-500 bg-transparent text-left justify-start text-fail-500 hover:bg-fail-200 shrink-0 focus:bg-fail-200 w-full"
                        onClick={() => setActiveModal("delete")}
                    >
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-1">
                            <Trash2></Trash2>
                            <span className="text-sm font-medium">Delete account</span>
                        </div>
                        <span className="text-xs text-neutral-500">Permanently remove your account and data.</span>
                    </div>
                    </Button>
                </div>
            </div>
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
                        <div className="flex items-center gap-2 text-fail-500">
                            {activeModal === "delete" ? (
                                <Trash2 className="size-5" />
                            ) : (
                                <ShieldAlert className="size-5" />
                            )}
                            <h3 className="font-semibold text-lg">
                                {activeModal === "deactivate"
                                    ? "Deactivate your account?"
                                    : "Delete your account?"
                                }
                            </h3>
                        </div>
                        <p className="text-sm text-neutral-500">
                            {activeModal === "deactivate"
                                ? "Your account will be temporarily disabled. You can reactivate it at any time by logging back in."
                                : "This action is permanent and cannot be undone. All your data will be removed."
                            }
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant='fail'
                                className="text-white font-bold"
                                disabled={isDeactivating || isDeleting}
                                onClick={activeModal === "deactivate" ? handleDeactivate : handleDelete}
                            >
                                {isDeactivating || isDeleting
                                    ? "Processing..."
                                    : activeModal === "deactivate" ? "Yes, Deactivate" : "Yes, Delete"
                                }
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                className="flex-1 "
                                onClick={() => setActiveModal(null)}
                                disabled={isDeactivating || isDeleting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DangerZoneSection