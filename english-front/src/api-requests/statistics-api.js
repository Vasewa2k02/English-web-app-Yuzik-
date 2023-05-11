import { $authHost } from "./index";
import { ROUTES } from "../utils/urls";

export const createOrUpdateStatistics = async (statisticsDto) => {
  const { data } = await $authHost.post(ROUTES.STATISTICS_ROUTE, statisticsDto);
  return data;
};
