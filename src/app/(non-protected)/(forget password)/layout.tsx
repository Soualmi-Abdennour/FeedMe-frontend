import React from 'react'
import ForgetPasswordRouteGuard from './ForgetPasswordRouteGuard'

function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ForgetPasswordRouteGuard>
            {children}
        </ForgetPasswordRouteGuard>
    )
}

export default Layout
