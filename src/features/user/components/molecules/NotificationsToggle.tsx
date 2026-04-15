"use client"
import { useState } from "react"

function NotificationsToggle() {
    const [enabled, setEnabled] = useState(false)

    return (
        <div className="p-3 rounded-lg flex items-center justify-between">
            <span className="font-semibold text-neutral-900">Activate Notifications :</span>
            <button
                type="button"
                onClick={() => setEnabled(state => !state)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none
                    ${enabled ? "bg-primary-500" : "bg-primary-200"}
                `}
            >
                <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300
                        ${enabled ? "translate-x-8" : "translate-x-1"}
                    `}
                />
            </button>
        </div>
    )
}

export default NotificationsToggle