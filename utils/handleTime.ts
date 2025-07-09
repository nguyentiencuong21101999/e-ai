import { formatDistanceToNowStrict } from "date-fns";
import dayjs from "dayjs";

export const handleExpiredToken = (expireTime?: number): boolean => {
  const milisecond = new Date().getTime() / 1000;
  if (expireTime) return expireTime - milisecond < 0;
  return true;
};

export const formatDistance = (date: string) => {
  if (!date) return;
  const nowString = new Date().toISOString();
  const now = new Date(nowString).getTime();
  const distance = (new Date(date).getTime() - now) / 1000 / 60 / 60;
  if (distance > 1) return dayjs(date).format("HH:mm");
  if (distance <= 0) return "";
  return formatDistanceToNowStrict(new Date(date));
};
