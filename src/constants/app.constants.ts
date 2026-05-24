import {
    BookOpen,
    MessageCircleQuestion,
    Filter,
    PlusCircle,
    Globe,
    Settings,
    Store,
    ChartArea,
} from "lucide-react";

const SHARED_START_ITEMS = [
    { label: "Publication", path: ["/publication"], icon: BookOpen },
    { label: "A & Q", path: ["/a-and-q"], icon: MessageCircleQuestion },
];

const SHARED_END_ITEMS = [
    { label: "Studio", path: ["/studio"], icon: PlusCircle },
    { label: "Profile", path: ["/profile"], icon: Globe },
    { label: "Setting", path: ["/settings/edit-profile", "/settings/edit-account"], icon: Settings },
];

export const USER_APP_NAVIGATION_ITEMS = [
    ...SHARED_START_ITEMS,
    { label: "Shop", path: ["/shop"], icon: Store },
    ...SHARED_END_ITEMS,
];

export const RESTAURANT_APP_NAVIGATION_ITEMS = [
    ...SHARED_START_ITEMS,
    { label: "Dashboard", path: ["/dashboard/order-management", "/dashboard/product-management"], icon: ChartArea },
    ...SHARED_END_ITEMS,
];


export const SETTINGS_NAVIGATION_ITEMS = [
    {
        label: "Edit Profile",
        path: ["/settings/edit-profile"],
    },
    {
        label: "Edit Account",
        path: ["/settings/edit-account"],
    },
];

// Usage Goals
export const USAGE_GOAL = [
    { key: "FOLLOW_HEALTHY_FOOD", value: "Follow healthy food" },
    { key: "SHARE_FOOD_PHOTOS", value: "Share food photos" },
    { key: "JOIN_FOOD_CHALLENGES", value: "Join food challenges" },
    { key: "GET_SPECIAL_OFFERS", value: "Get special offers & discounts" },
    { key: "DISCOVER_RESTAURANTS", value: "Discover restaurants" },
    { key: "ORDER_FOOD_ONLINE", value: "Order food online" },
    { key: "TRACK_MY_MEALS", value: "Track my meals" },
    { key: "FIND_TRENDING_DISHES", value: "Find trending dishes" },
    { key: "FOOD_FREE", value: "Food free" },
    { key: "WRITE_REVIEWS", value: "Write reviews" },
    { key: "GET_PERSONALIZED_RECOMMENDATIONS", value: "Get personalized recommendations" },
    { key: "SAVE_FAVORITE_PLACES", value: "Save my favorite places" }
] as const

// Kitchen Categories
export const KITCHEN_CATEGORY = [
    { key: "VEGETARIAN", value: "vegetarian" },
    { key: "FAST_FOOD", value: "Fast Food" },
    { key: "DESSERTS_AND_SWEETS", value: "Deserts & Sweets" },
    { key: "SEAFOOD", value: "Seafood" },
    { key: "HEALTHY_FOOD", value: "Healthy Food" },
    { key: "TRADITIONAL_DISHES", value: "Traditional dishes" }
] as const

// Week Days
export const WEEK_DAYS = [
    { key: "MONDAY", value: "Monday" },
    { key: "TUESDAY", value: "Tuesday" },
    { key: "WEDNESDAY", value: "Wednesday" },
    { key: "THURSDAY", value: "Thursday" },
    { key: "FRIDAY", value: "Friday" },
    { key: "SATURDAY", value: "Saturday" },
    { key: "SUNDAY", value: "Sunday" }
] as const

export const ALGERIA_STATES = [
    { key: "ADRAR", value: "Adrar" },
    { key: "CHLEF", value: "Chlef" },
    { key: "LAGHOUAT", value: "Laghouat" },
    { key: "OUM_EL_BOUAGHI", value: "Oum El Bouaghi" },
    { key: "BATNA", value: "Batna" },
    { key: "BEJAIA", value: "Béjaïa" },
    { key: "BISKRA", value: "Biskra" },
    { key: "BECHAR", value: "Béchar" },
    { key: "BLIDA", value: "Blida" },
    { key: "BOUIRA", value: "Bouïra" },
    { key: "TAMANRASSET", value: "Tamanrasset" },
    { key: "TEBESSA", value: "Tébessa" },
    { key: "TLEMCEN", value: "Tlemcen" },
    { key: "TIARET", value: "Tiaret" },
    { key: "TIZI_OUZOU", value: "Tizi Ouzou" },
    { key: "ALGIERS", value: "Algiers" },
    { key: "DJELFA", value: "Djelfa" },
    { key: "JIJEL", value: "Jijel" },
    { key: "SETIF", value: "Sétif" },
    { key: "SAIDA", value: "Saïda" },
    { key: "SKIKDA", value: "Skikda" },
    { key: "SIDI_BEL_ABBES", value: "Sidi Bel Abbès" },
    { key: "ANNABA", value: "Annaba" },
    { key: "GUELMA", value: "Guelma" },
    { key: "CONSTANTINE", value: "Constantine" },
    { key: "MEDEA", value: "Médéa" },
    { key: "MOSTAGANEM", value: "Mostaganem" },
    { key: "MSILA", value: "M'Sila" },
    { key: "MASCARA", value: "Mascara" },
    { key: "OUARGLA", value: "Ouargla" },
    { key: "ORAN", value: "Oran" },
    { key: "BAYADH", value: "El Bayadh" },
    { key: "ILLIZI", value: "Illizi" },
    { key: "BORDJ_BOU_ARRERIDJ", value: "Bordj Bou Arréridj" },
    { key: "BOUMERDES", value: "Boumerdès" },
    { key: "EL_TARF", value: "El Tarf" },
    { key: "TINDOUF", value: "Tindouf" },
    { key: "TISSEMSILT", value: "Tissemsilt" },
    { key: "EL_OUED", value: "El Oued" },
    { key: "KHENCHELA", value: "Khenchela" },
    { key: "SOUK_AHRAS", value: "Souk Ahras" },
    { key: "TIPAZA", value: "Tipaza" },
    { key: "MILA", value: "Mila" },
    { key: "AIN_DEFLA", value: "Aïn Defla" },
    { key: "NAAMA", value: "Naâma" },
    { key: "AIN_TEMOUCHENT", value: "Aïn Témouchent" },
    { key: "GHARDAIA", value: "Ghardaïa" },
    { key: "RELIZANE", value: "Relizane" }
] as const



export const RESTAURANT_SERVICES = [
    { key: "delivery", value: "Delivery" },
    { key: "reservation", value: "Reservation" },
    { key: "dineIn", value: "Dine in" },
    { key: "takeAway", value: "Special customer service" },
    { key: "parkAvailability", value: "Park Availability" }
] as const



