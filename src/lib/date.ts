import {
  format,
  formatDistanceToNowStrict,
  isToday as isTodayFn,
  isValid,
  parseISO
} from "date-fns";

import { DATE_PATTERN, DATEFNS_LOCALE } from "@/constants/date.constants";

export const parseDate = (value?: string | null) => {
  if (!value) return null;
  const d = parseISO(value);
  return isValid(d) ? d : null;
};

const toDate = (v: Date | string | null | undefined) => {
  if (!v) return null;
  if (v instanceof Date) return isValid(v) ? v : null;
  return parseDate(v);
};

export const formatDate = (date: Date | string, pattern = DATE_PATTERN.DATE) => {
  const d = toDate(date);
  if (!d) return "-";
  return format(d, pattern, { locale: DATEFNS_LOCALE });
};

export const timeAgo = (date: Date | string) => {
  const d = toDate(date);
  if (!d) return "-";
  return formatDistanceToNowStrict(d, { addSuffix: true, locale: DATEFNS_LOCALE });
};

export const isToday = (date: Date | string) => {
  const d = toDate(date);
  return d ? isTodayFn(d) : false;
};
