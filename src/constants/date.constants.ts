import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";

export const DATEFNS_LOCALE: Locale = enUS;

export const DATE_PATTERN = {
  DATE: "PPP",
  DATE_TIME: "PPpp",
  TIME: "p"
} as const;
