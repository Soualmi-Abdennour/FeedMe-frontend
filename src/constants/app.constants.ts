import {
    BookOpen,
    MessageCircleQuestion,
    Filter,
    PlusCircle,
    Globe,
    Settings,
} from "lucide-react";


// Usage Goals
export const USAGE_GOAL = [
    { value: "FOLLOW_HEALTHY_FOOD", label: "Follow healthy food" },
    { value: "SHARE_FOOD_PHOTOS", label: "Share food photos" },
    { value: "JOIN_FOOD_CHALLENGES", label: "Join food challenges" },
    { value: "GET_SPECIAL_OFFERS", label: "Get special offers & discounts" },
    { value: "DISCOVER_RESTAURANTS", label: "Discover restaurants" },
    { value: "ORDER_FOOD_ONLINE", label: "Order food online" },
    { value: "TRACK_MY_MEALS", label: "Track my meals" },
    { value: "FIND_TRENDING_DISHES", label: "Find trending dishes" },
    { value: "FOOD_FREE", label: "Food free" },
    { value: "WRITE_REVIEWS", label: "Write reviews" },
    { value: "GET_PERSONALIZED_RECOMMENDATIONS", label: "Get personalized recommendations" },
    { value: "SAVE_FAVORITE_PLACES", label: "Save my favorite places" }
] as const

// Kitchen Categories
export const KITCHEN_CATEGORY = [
    { value: "VEGETARIAN", label: "vegetarian" },
    { value: "FAST_FOOD", label: "Fast Food" },
    { value: "DESSERTS_AND_SWEETS", label: "Deserts & Sweets" },
    { value: "SEAFOOD", label: "Seafood" },
    { value: "HEALTHY_FOOD", label: "Healthy Food" },
    { value: "TRADITIONAL_DISHES", label: "Traditional dishes" }
] as const

// Week Days
export const WEEK_DAYS = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
    { value: "SATURDAY", label: "Saturday" },
    { value: "SUNDAY", label: "Sunday" }
] as const

export const ALGERIA_STATES = [
    { value: "ADRAR", label: "Adrar" },
    { value: "CHLEF", label: "Chlef" },
    { value: "LAGHOUAT", label: "Laghouat" },
    { value: "OUM_EL_BOUAGHI", label: "Oum El Bouaghi" },
    { value: "BATNA", label: "Batna" },
    { value: "BEJAIA", label: "Béjaïa" },
    { value: "BISKRA", label: "Biskra" },
    { value: "BECHAR", label: "Béchar" },
    { value: "BLIDA", label: "Blida" },
    { value: "BOUIRA", label: "Bouïra" },
    { value: "TAMANRASSET", label: "Tamanrasset" },
    { value: "TEBESSA", label: "Tébessa" },
    { value: "TLEMCEN", label: "Tlemcen" },
    { value: "TIARET", label: "Tiaret" },
    { value: "TIZI_OUZOU", label: "Tizi Ouzou" },
    { value: "ALGIERS", label: "Algiers" },
    { value: "DJELFA", label: "Djelfa" },
    { value: "JIJEL", label: "Jijel" },
    { value: "SETIF", label: "Sétif" },
    { value: "SAIDA", label: "Saïda" },
    { value: "SKIKDA", label: "Skikda" },
    { value: "SIDI_BEL_ABBES", label: "Sidi Bel Abbès" },
    { value: "ANNABA", label: "Annaba" },
    { value: "GUELMA", label: "Guelma" },
    { value: "CONSTANTINE", label: "Constantine" },
    { value: "MEDEA", label: "Médéa" },
    { value: "MOSTAGANEM", label: "Mostaganem" },
    { value: "MSILA", label: "M'Sila" },
    { value: "MASCARA", label: "Mascara" },
    { value: "OUARGLA", label: "Ouargla" },
    { value: "ORAN", label: "Oran" },
    { value: "BAYADH", label: "El Bayadh" },
    { value: "ILLIZI", label: "Illizi" },
    { value: "BORDJ_BOU_ARRERIDJ", label: "Bordj Bou Arréridj" },
    { value: "BOUMERDES", label: "Boumerdès" },
    { value: "EL_TARF", label: "El Tarf" },
    { value: "TINDOUF", label: "Tindouf" },
    { value: "TISSEMSILT", label: "Tissemsilt" },
    { value: "EL_OUED", label: "El Oued" },
    { value: "KHENCHELA", label: "Khenchela" },
    { value: "SOUK_AHRAS", label: "Souk Ahras" },
    { value: "TIPAZA", label: "Tipaza" },
    { value: "MILA", label: "Mila" },
    { value: "AIN_DEFLA", label: "Aïn Defla" },
    { value: "NAAMA", label: "Naâma" },
    { value: "AIN_TEMOUCHENT", label: "Aïn Témouchent" },
    { value: "GHARDAIA", label: "Ghardaïa" },
    { value: "RELIZANE", label: "Relizane" }
] as const



export const RESTAURANT_SERVICES = [
    { value: "delivery", label: "Delivery" },
    { value: "reservation", label: "Reservation" },
    { value: "dineIn", label: "Dine in" },
    { value: "takeAway", label: "Special customer service" },
    { value: "parkAvailability", label: "Park Availability" }
] as const



export const APP_NAVIGATION_ITEMS = [
    {
        label: "Publication",
        path: "/publication",
        icon: BookOpen,
    },
    {
        label: "A & Q",
        path: "/a-and-q",
        icon: MessageCircleQuestion,
    },
    {
        label: "Filtering",
        path: "/filtering",
        icon: Filter,
    },
    {
        label: "Studio",
        path: "/studio",
        icon: PlusCircle,
    },
    {
        label: "Profile",
        path: "/profile",
        icon: Globe,
    },
    {
        label: "Setting",
        path: "/setting",
        icon: Settings,
    },
];
