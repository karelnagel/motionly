/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";
import {
  IoIosInformationCircleOutline,
  IoIosWarning,
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import { getRandomId } from "../helpers";

type AlertType = "info" | "success" | "warning" | "error";
const AlertContext = createContext((message: string, type?: AlertType) => {
  console.log(message, type);
});

export const Alerts = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<
    { message: string; type?: AlertType; id: string }[]
  >([]);

  const alert = (message: string, type?: AlertType) => {
    const id = getRandomId();
    setAlerts((a) => [...a, { message, type, id }]);
    setTimeout(() => removeAlert(id), 10000);
  };

  const removeAlert = (id: string) => {
    setAlerts((a) => a.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={alert}>
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
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const alert = useContext(AlertContext);
  return alert;
};
