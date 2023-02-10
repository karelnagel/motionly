/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { ReactNode, useState } from "react";
import {
  IoIosInformationCircleOutline,
  IoIosWarning,
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { create } from "zustand";
import { getRandomId } from "../helpers";

type AlertType = "info" | "success" | "warning" | "error";
type Alert = {
  message: string;
  type?: AlertType;
  id: string;
};

type AlertStore = {
  addAlert: (message: string, type?: AlertType) => void;
  removeAlert: (id: string) => void;
  alerts: Alert[];
};

export const useAlerts = create<AlertStore>((set, get) => ({
  addAlert: (message: string, type?: AlertType) => {
    const id = getRandomId();
    set((s) => ({
      alerts: [...s.alerts, { message, type, id }],
    }));
    setTimeout(() => get().removeAlert(id), 10000);
  },
  removeAlert: (id: string) => {
    set((s) => ({
      alerts: s.alerts.filter((alert) => alert.id !== id),
    }));
  },
  alerts: [] as { message: string; type?: AlertType; id: string }[],
}));

export const Alerts = ({ children }: { children: ReactNode }) => {
  const alerts = useAlerts((s) => s.alerts);
  const removeAlert = useAlerts((s) => s.removeAlert);
  return (
    <div>
      {children}
      <div className="fixed bottom-3 left-3 flex flex-col space-y-3">
        {alerts.map(({ message, type, id }, i) => (
          <div
            key={i}
            onClick={() => removeAlert(id)}
            className={`w-auto min-w-[300px] p-3 cursor-pointer alert shadow-lg ${
              type === "info"
                ? "alert-info"
                : type === "success"
                ? "alert-success"
                : type === "warning"
                ? "alert-warning"
                : type === "error"
                ? "alert-error"
                : ""
            }`}
          >
            <div className="text-2xl">
              {type === "info" && <IoIosInformationCircleOutline />}
              {type === "success" && <IoMdCheckmarkCircleOutline />}
              {type === "warning" && <IoIosWarning />}
              {type === "error" && <IoMdCloseCircleOutline />}
              <span className="text-lg">{message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
