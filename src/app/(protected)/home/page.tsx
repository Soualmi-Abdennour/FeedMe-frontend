import Link from "next/link"



function Page() {
    return (
        <div>
        <h1 className='text-center text-7xl border-pri'>Here we find the reels</h1>
        <Link href={"/settings"}>settings</Link>
        </div>
            )
}

export default Page
