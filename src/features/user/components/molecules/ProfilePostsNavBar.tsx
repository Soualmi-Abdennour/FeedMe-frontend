import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'



function ProfilePostsNavBar({
    currentTab,
    navItems,
    setCurrentTab
}: {
    currentTab:string,
    navItems:{
        tabName: string,
        icon:LucideIcon
    }[]
        setCurrentTab: Dispatch<SetStateAction<string>>
}) {
    return (
        <div className='flex w-full justify-between gap-5'>
            {navItems.map(({tabName,icon:Icon}) => (
                <Button key={tabName} 
                    variant={currentTab===tabName?"primary":"ghost"}
                    onClick={()=>setCurrentTab(tabName)}
                    className='w-full h-fit'
                >
                    <Icon size={50}/>
                </Button>
            ))}
        </div>
    )
}

export default ProfilePostsNavBar