import { ROUTES } from "./utils/urls";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dictionary from "./pages/Dictionary";
import DictionaryReview from "./pages/DictionaryReview";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import PersonalCabinet from "./pages/PersonalCabinet";
import Lesson from "./pages/Lesson";

export const userRoutes = [
  {
    path: ROUTES.PERSONAL_CABINET_ROUTE,
    Component: PersonalCabinet,
  },
  {
    path: ROUTES.DICTIONARY_ROUTE,
    Component: Dictionary,
  },
  {
    path: ROUTES.DICTIONARY_REVIEW_ROUTE,
    Component: DictionaryReview,
  },
];

export const adminRoutes = [
  {
    path: ROUTES.DICTIONARY_ROUTE,
    Component: Dictionary,
  },
  {
    path: ROUTES.LESSON_ADMIN_ROUTE,
    Component: Lesson,
  },
];

export const publicRoutes = [
  {
    path: ROUTES.LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: ROUTES.REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: ROUTES.STATISTICS_ROUTE,
    Component: Statistics,
  },
  {
    path: "*",
    Component: NotFound,
  },
];
