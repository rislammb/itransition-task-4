import { format } from "date-fns";

export const formatDate = (data: string) =>
  format(data, "HH:mm:ss, dd MMM, yyyy");
