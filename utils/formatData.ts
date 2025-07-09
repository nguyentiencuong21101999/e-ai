import { formatCurrency } from "./formatInput";
import moment from "moment";

export const formatDate = (date: string | Date, style: string) =>
  moment(date).format(style);

export const formatCurrencyBuiltInFunc = (value: string | number) => {
  if(typeof value === "number" || typeof value === "string") return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return ""
}
  
