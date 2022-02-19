import useSWR from "swr";
import { fetchAPI } from "./api";

export function useSiteTitle(): string {
  const { data, error } = useSWR("getSiteInfo", () =>
    fetchAPI("/site", { populate: "*" })
  );
  if (error) return "";
  if (!data) return "";
  return data.data.attributes.title;
}
