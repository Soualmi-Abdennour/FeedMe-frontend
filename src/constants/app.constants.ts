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
export const DASHBOARD_NAVIGATION_ITEMS = [
    {
        label: "Manage Orders",
        path: ["/dashboard/order-management"],
    },
    {
        label: "Manage Products",
        path: ["/dashboard/product-management"],
    },
];

// Usage Goals
export const USAGE_GOAL = [
    { key: "FOLLOW_HEALTHY_FOOD", value: "Follow healthy food", label: "Follow healthy food" },
    { key: "SHARE_FOOD_PHOTOS", value: "Share food photos", label: "Share food photos" },
    { key: "JOIN_FOOD_CHALLENGES", value: "Join food challenges", label: "Join food challenges" },
    { key: "GET_SPECIAL_OFFERS", value: "Get special offers & discounts", label: "Get special offers & discounts" },
    { key: "DISCOVER_RESTAURANTS", value: "Discover restaurants", label: "Discover restaurants" },
    { key: "ORDER_FOOD_ONLINE", value: "Order food online", label: "Order food online" },
    { key: "TRACK_MY_MEALS", value: "Track my meals", label: "Track my meals" },
    { key: "FIND_TRENDING_DISHES", value: "Find trending dishes", label: "Find trending dishes" },
    { key: "FOOD_FREE", value: "Food free", label: "Food free" },
    { key: "WRITE_REVIEWS", value: "Write reviews", label: "Write reviews" },
    { key: "GET_PERSONALIZED_RECOMMENDATIONS", value: "Get personalized recommendations", label: "Get personalized recommendations" },
    { key: "SAVE_FAVORITE_PLACES", value: "Save my favorite places", label: "Save my favorite places" }
] as const

export const KITCHEN_CATEGORY = [
    { key: "VEGETARIAN", value: "Vegetarian", label: "Vegetarian" },
    { key: "FAST_FOOD", value: "Fast Food", label: "Fast Food" },
    { key: "DESSERTS_AND_SWEETS", value: "Deserts & Sweets", label: "Deserts & Sweets" },
    { key: "SEAFOOD", value: "Seafood", label: "Seafood" },
    { key: "HEALTHY_FOOD", value: "Healthy Food", label: "Healthy Food" },
    { key: "TRADITIONAL_DISHES", value: "Traditional dishes", label: "Traditional dishes" }
] as const

export const WEEK_DAYS = [
    { key: "MONDAY", value: "Monday", label: "Monday" },
    { key: "TUESDAY", value: "Tuesday", label: "Tuesday" },
    { key: "WEDNESDAY", value: "Wednesday", label: "Wednesday" },
    { key: "THURSDAY", value: "Thursday", label: "Thursday" },
    { key: "FRIDAY", value: "Friday", label: "Friday" },
    { key: "SATURDAY", value: "Saturday", label: "Saturday" },
    { key: "SUNDAY", value: "Sunday", label: "Sunday" }
] as const

export const ALGERIA_STATES = [
    { key: "ADRAR", value: "Adrar", label: "Adrar" },
    { key: "CHLEF", value: "Chlef", label: "Chlef" },
    { key: "LAGHOUAT", value: "Laghouat", label: "Laghouat" },
    { key: "OUM_EL_BOUAGHI", value: "Oum El Bouaghi", label: "Oum El Bouaghi" },
    { key: "BATNA", value: "Batna", label: "Batna" },
    { key: "BEJAIA", value: "Béjaïa", label: "Béjaïa" },
    { key: "BISKRA", value: "Biskra", label: "Biskra" },
    { key: "BECHAR", value: "Béchar", label: "Béchar" },
    { key: "BLIDA", value: "Blida", label: "Blida" },
    { key: "BOUIRA", value: "Bouïra", label: "Bouïra" },
    { key: "TAMANRASSET", value: "Tamanrasset", label: "Tamanrasset" },
    { key: "TEBESSA", value: "Tébessa", label: "Tébessa" },
    { key: "TLEMCEN", value: "Tlemcen", label: "Tlemcen" },
    { key: "TIARET", value: "Tiaret", label: "Tiaret" },
    { key: "TIZI_OUZOU", value: "Tizi Ouzou", label: "Tizi Ouzou" },
    { key: "ALGIERS", value: "Algiers", label: "Algiers" },
    { key: "DJELFA", value: "Djelfa", label: "Djelfa" },
    { key: "JIJEL", value: "Jijel", label: "Jijel" },
    { key: "SETIF", value: "Sétif", label: "Sétif" },
    { key: "SAIDA", value: "Saïda", label: "Saïda" },
    { key: "SKIKDA", value: "Skikda", label: "Skikda" },
    { key: "SIDI_BEL_ABBES", value: "Sidi Bel Abbès", label: "Sidi Bel Abbès" },
    { key: "ANNABA", value: "Annaba", label: "Annaba" },
    { key: "GUELMA", value: "Guelma", label: "Guelma" },
    { key: "CONSTANTINE", value: "Constantine", label: "Constantine" },
    { key: "MEDEA", value: "Médéa", label: "Médéa" },
    { key: "MOSTAGANEM", value: "Mostaganem", label: "Mostaganem" },
    { key: "MSILA", value: "M'Sila", label: "M'Sila" },
    { key: "MASCARA", value: "Mascara", label: "Mascara" },
    { key: "OUARGLA", value: "Ouargla", label: "Ouargla" },
    { key: "ORAN", value: "Oran", label: "Oran" },
    { key: "BAYADH", value: "El Bayadh", label: "El Bayadh" },
    { key: "ILLIZI", value: "Illizi", label: "Illizi" },
    { key: "BORDJ_BOU_ARRERIDJ", value: "Bordj Bou Arréridj", label: "Bordj Bou Arréridj" },
    { key: "BOUMERDES", value: "Boumerdès", label: "Boumerdès" },
    { key: "EL_TARF", value: "El Tarf", label: "El Tarf" },
    { key: "TINDOUF", value: "Tindouf", label: "Tindouf" },
    { key: "TISSEMSILT", value: "Tissemsilt", label: "Tissemsilt" },
    { key: "EL_OUED", value: "El Oued", label: "El Oued" },
    { key: "KHENCHELA", value: "Khenchela", label: "Khenchela" },
    { key: "SOUK_AHRAS", value: "Souk Ahras", label: "Souk Ahras" },
    { key: "TIPAZA", value: "Tipaza", label: "Tipaza" },
    { key: "MILA", value: "Mila", label: "Mila" },
    { key: "AIN_DEFLA", value: "Aïn Defla", label: "Aïn Defla" },
    { key: "NAAMA", value: "Naâma", label: "Naâma" },
    { key: "AIN_TEMOUCHENT", value: "Aïn Témouchent", label: "Aïn Témouchent" },
    { key: "GHARDAIA", value: "Ghardaïa", label: "Ghardaïa" },
    { key: "RELIZANE", value: "Relizane", label: "Relizane" }
] as const

export const RESTAURANT_SERVICES = [
    {key:"DELIVERY", value: "delivery", label: "Delivery" },
    {key:"RESERVATION", value: "reservation", label: "Reservation" },
    {key:"DINE_IN", value: "dineIn", label: "Dine in" },
    {key:"SPECIAL_CUSTOMER_SERVICE", value: "takeAway", label: "Special customer service" },
    {key:"PARK_AVAILABILITY", value: "parkAvailability", label: "Park Availability" }
] as const

export const CONTENT_TYPE = [{ key: "RECIPE", label: "Recipe", value: "RECIPE" }, { key: "DISH", label: "Dish", value: "DISH" }]

