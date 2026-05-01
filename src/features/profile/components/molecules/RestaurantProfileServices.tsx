"use client";
import React from "react";
import { RestaurantUserProfileAppModel } from "@/features/user/types/user.types";
import { ServiceStatus, WorkingDay } from "@/types/app.types";
import { CheckCircle, XCircle, Clock ,Server} from "lucide-react";

type Props = {
  profile: RestaurantUserProfileAppModel;
};

const SERVICE_LABELS: Record<keyof RestaurantUserProfileAppModel["restaurantServices"], string> = {
  delivery: "Delivery",
  reservation: "Reservation",
  dineIn: "Dine In",
  takeAway: "Take Away",
  parkAvailability: "Parking",
};

function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  if (status === "YES") {
    return (
      <span className="flex items-center gap-1 text-success-600 text-xs font-medium">
        <CheckCircle className="w-3.5 h-3.5" /> Available
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-fail-400 text-xs font-medium">
      <XCircle className="w-3.5 h-3.5" /> Unavailable
    </span>
  );
}

function RestaurantProfileServices({ profile }: Props) {
  const { restaurantServices, restaurantDetails } = profile;

  return (
    <div className="gap-6 p-6 border-b border-border grid grid-cols-2">

      <div className="shadow-lg p-4 rounded-lg">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-primary-500"></Server>
          Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {(Object.entries(restaurantServices) as [keyof typeof restaurantServices, ServiceStatus][]).map(
            ([key, status]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg px-3 py-2 border border-primary-400"
              >
                <span className="text-sm text-foreground">{SERVICE_LABELS[key]}</span>
                <ServiceStatusBadge status={status} />
              </div>
            )
          )}
        </div>
      </div>

      {restaurantDetails.workingDays && restaurantDetails.workingDays.length > 0 && (
        <div className="shadow-lg p-4 rounded-lg">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-500" />
            Working Hours
          </h2>
          <div className="flex flex-col gap-2">
            {restaurantDetails.workingDays.map((wd: WorkingDay) => (
              <div
                key={wd.day}
                className="flex items-center justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <span className="font-medium text-foreground w-24">{wd.day}</span>
                  <span className="text-muted-foreground">
                    {wd.from} – {wd.to}
                  </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantProfileServices;