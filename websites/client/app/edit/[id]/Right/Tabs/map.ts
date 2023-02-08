import { IoIosSettings } from "react-icons/io";
import { Tab } from ".";

export const map: Tab = {
  name: "Map",
  Icon: IoIosSettings,
  if: (props) => props.comp === "map",
  inputs: [],
};
