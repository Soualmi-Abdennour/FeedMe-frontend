import { USAGE_GOAL,KITCHEN_CATEGORY, ALGERIA_STATES, WEEK_DAYS } from "@/constants/app.constants";

export type ServiceStatus="YES"|"NO"
export type UsageGoal = typeof USAGE_GOAL[number]['value'];
export type KithcenCategory = typeof KITCHEN_CATEGORY[number]['value'];
export type Wilaya = typeof ALGERIA_STATES[number]['value'];
export type WeekDay = typeof WEEK_DAYS[number]['value'];