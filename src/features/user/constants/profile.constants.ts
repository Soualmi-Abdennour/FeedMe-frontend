import { Bookmark, Heart, Play, UserRound } from 'lucide-react'

export const MY_PROFILE_NAV_ITEMS = [
    {
        tabName: "MY_POSTS",
        icon: Play,
    },
    {
        tabName: "SAVED_POSTS",
        icon: Bookmark
    },
    {
        tabName: "LIKED_POSTS",
        icon: Heart
    }
] 
export const OTHER_PROFILE_NAV_ITEMS = [
    {
        tabName: "POSTS",
        icon: Play,
    },
    // we have this navbar only for restaurant user
    {
        tabName: "RESTAURANT_INFO",
        icon: UserRound
    },
    
] 