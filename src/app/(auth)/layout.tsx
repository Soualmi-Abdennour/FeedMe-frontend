import React, { PropsWithChildren } from 'react'
import Image from "next/image";


function Layout({children}: PropsWithChildren) {

    return (
        <div className="relative min-h-screen">
                <Image
                    src={"/sign-up/auth-bck.png"}
                    fill
                    alt="bck"
                    className="absolute top-0 left-0 -z-10 inset-0 object-cover opacity-30"
                />
            <main >
                {children}
            </main>
        </div>
    )
}

export default Layout
