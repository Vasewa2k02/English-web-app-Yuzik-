import { ROUTES } from "./utils/urls";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Dictionary from "./pages/Dictionary";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

export const userRoutes = [
  {
    path: ROUTES.DICTIONARY_ROUTE,
    Component: Dictionary,
  },
];

export const adminRoutes = [
  {
    path: ROUTES.DICTIONARY_ROUTE,
    Component: Dictionary,
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
