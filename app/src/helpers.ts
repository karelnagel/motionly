export const getRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
