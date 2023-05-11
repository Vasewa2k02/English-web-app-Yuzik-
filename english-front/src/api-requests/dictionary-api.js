import { $authHost } from "./index";
import { ROUTES } from "../utils/urls";

export const getUserDictionaries = async () => {
  const { data } = await $authHost.get(ROUTES.DICTIONARY_USER_ROUTE);
  return data;
};

export const getAdminDictionaries = async () => {
  const { data } = await $authHost.get(ROUTES.DICTIONARY_ADMIN_ROUTE);
  return data;
};

export const getDictionariesReview = async () => {
  const { data } = await $authHost.get(ROUTES.DICTIONARY_REVIEW_ROUTE);
  return data;
};

export const getDictionariesLearn = async () => {
  const { data } = await $authHost.get(ROUTES.DICTIONARY_LEARN_ROUTE);
  return data;
};

export const createDictionary = async ({ name, description }) => {
  const { data } = await $authHost.post(ROUTES.DICTIONARY_ROUTE, {
    name,
    description,
  });
  return data;
};

export const deleteDictionary = async (id) => {
  const { data } = await $authHost.delete(`${ROUTES.DICTIONARY_ROUTE}/${id}`);
  return data;
};

export const updateDictionary = async (id, { name, description }) => {
  const { data } = await $authHost.patch(`${ROUTES.DICTIONARY_ROUTE}/${id}`, {
    name,
    description,
  });
  return data;
};
