// NOTE: https://medium.com/@raelsei/how-to-merge-react-and-tailwind-css-class-names-f5faeb10ed24
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
