import React from 'react'
import AuthRouteGuard from './AuthRouteGuard'

function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthRouteGuard>
            {children}
        </AuthRouteGuard>
    )
}

export default Layout
