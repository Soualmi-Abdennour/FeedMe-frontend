import { ServiceStatus } from '@/types/app.types';
import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react'

function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
    if (status === "YES") {
        return (
            <span className="flex items-center gap-1 text-success-600 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Available
            </span>
        );
    }
    return (
        <span className="flex items-center gap-1 text-fail-400 text-xs font-medium">
            <XCircle className="w-3.5 h-3.5" /> Unavailable
        </span>
    );
}

export default ServiceStatusBadge
