import { $authHost } from "./index";
import { ROUTES } from "../utils/urls";

export const createGrammarProgress = async (grammarProgressDto) => {
  const { data } = await $authHost.post(
    ROUTES.GRAMMAR_PROGRESS_ROUTE,
    grammarProgressDto
  );
  return data;
};
