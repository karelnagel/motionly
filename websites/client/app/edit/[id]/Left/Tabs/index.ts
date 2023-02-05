export const LeftTabs = {
  template: {
    name: "Template",
    icon: "/icons/template.png",
    Component: () => import("./Template"),
  },
  media: {
    name: "Media",
    icon: "/icons/media.png",
    Component: () => import("./Media"),
  },
  stock: {
    name: "Stock media",
    icon: "/icons/stock.png",
    Component: () => import("./Stock"),
  },
  elements: {
    name: "Elements",
    icon: "/icons/elements.png",
    Component: () => import("./Elements"),
  },
  text: {
    name: "Text",
    icon: "/icons/text.png",
    Component: () => import("./Text"),
  },
  data: {
    name: "Data",
    icon: "/icons/data.png",
    Component: () => import("./Data"),
  },
  code: {
    name: "Code",
    icon: "/icons/code.png",
    Component: () => import("./Code"),
  },
  ai: {
    name: "AI",
    icon: "/icons/ai.png",
    Component: () => import("./AI"),
  },
};
export type LeftTabs = keyof typeof LeftTabs;
