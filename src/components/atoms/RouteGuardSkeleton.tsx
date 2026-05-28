import React from 'react'

function RouteGuardSkeleton() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                background: "var(--background, #0a0a0a)",
            }}
        >
            <span
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "3px solid rgba(255,255,255,0.15)",
                    borderTopColor: "rgba(255,255,255,0.8)",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default RouteGuardSkeleton
