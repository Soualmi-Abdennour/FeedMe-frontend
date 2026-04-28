import { USAGE_GOAL,KITCHEN_CATEGORY, ALGERIA_STATES, WEEK_DAYS } from "@/constants/app.constants";

type D01 = "0" | "1";
type D03 = "0" | "1" | "2" | "3";
type D05 = "0" | "1" | "2" | "3" | "4" | "5";
type D09 = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type TimeString =
    | `${D01}${D09}:${D05}${D09}`
    | `2${D03}:${D05}${D09}`
    | ""
export type ServiceStatus="YES"|"NO"
export type UsageGoal = typeof USAGE_GOAL[number]['value'];
export type KithcenCategory = typeof KITCHEN_CATEGORY[number]['value'];
export type Wilaya = typeof ALGERIA_STATES[number]['value'];
export type WeekDay = typeof WEEK_DAYS[number]['label'];
export type WorkingDay= {
    day:WeekDay,
    from:TimeString,
    to:TimeString
}