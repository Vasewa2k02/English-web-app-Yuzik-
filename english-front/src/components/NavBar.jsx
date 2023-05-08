import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Menubar } from "primereact/menubar";

import { Context } from "../index";
import { ROUTES } from "../utils/urls";
import { ROLES } from "../utils/roles";
import { logout } from "../api-requests/user-api";
import "../styles/navbar.css";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const dictionariesItem = {
    label: "Словари",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "Изменить",
        icon: "pi pi-fw pi-file-edit",
        command: () => {
          navigate(ROUTES.DICTIONARY_ROUTE);
        },
      },
      {
        label: "Просмотреть",
        icon: "pi pi-fw pi-file-word",
        command: () => {
          navigate(ROUTES.DICTIONARY_REVIEW_ROUTE);
        },
      },
    ],
  };

  const adminDictionariesItem = {
    label: "Словари",
    icon: "pi pi-fw pi-file-edit",
    command: () => {
      navigate(ROUTES.DICTIONARY_ROUTE);
    },
  };

  const adminLessonsItem = {
    label: "Уроки",
    icon: "pi pi-fw pi-pencil",
    command: () => {
      navigate(ROUTES.LESSON_ADMIN_ROUTE);
    },
  };

  const personalCabinetItem = {
    label: "Личный кабинет",
    icon: "pi pi-fw pi-user",
    command: () => {
      navigate(ROUTES.PERSONAL_CABINET_ROUTE);
    },
  };

  const loginItem = {
    label: "Войти",
    icon: "pi pi-fw pi-sign-in",
    command: () => {
      navigate(ROUTES.LOGIN_ROUTE);
    },
  };

  const registerItem = {
    label: "Создать аккаунт",
    icon: "pi pi-fw pi-user-plus",
    command: () => {
      navigate(ROUTES.REGISTRATION_ROUTE);
    },
  };

  const logoutItem = {
    label: "Сменить аккаунт",
    icon: "pi pi-fw pi-sign-out",
    command: async () => {
      user.setUser({});
      user.setRoleId(ROLES.UNAUTHORIZED);
      await logout();
      navigate(ROUTES.LOGIN_ROUTE);
    },
  };

  return (
    <div>
      <Menubar
        className="navbar"
        model={
          user.getRoleId() === ROLES.USER
            ? [personalCabinetItem, dictionariesItem, logoutItem]
            : user.getRoleId() === ROLES.ADMIN
            ? [adminDictionariesItem, adminLessonsItem, logoutItem]
            : [registerItem, loginItem]
        }
      />
    </div>
  );
});

export default NavBar;

// const items = [
//   {
//     label: "File",
//     icon: "pi pi-fw pi-file",
//     items: [
//       {
//         label: "New",
//         icon: "pi pi-fw pi-plus",
//         items: [
//           {
//             label: "Bookmark",
//             icon: "pi pi-fw pi-bookmark",
//           },
//           {
//             label: "Video",
//             icon: "pi pi-fw pi-video",
//           },
//         ],
//       },
//       {
//         label: "Delete",
//         icon: "pi pi-fw pi-trash",
//       },
//       {
//         separator: true,
//       },
//       {
//         label: "Export",
//         icon: "pi pi-fw pi-external-link",
//       },
//     ],
//   },
//   {
//     label: "Edit",
//     icon: "pi pi-fw pi-pencil",
//     items: [
//       {
//         label: "Left",
//         icon: "pi pi-fw pi-align-left",
//       },
//       {
//         label: "Right",
//         icon: "pi pi-fw pi-align-right",
//       },
//       {
//         label: "Center",
//         icon: "pi pi-fw pi-align-center",
//       },
//       {
//         label: "Justify",
//         icon: "pi pi-fw pi-align-justify",
//       },
//     ],
//   },
//   {
//     label: "Users",
//     icon: "pi pi-fw pi-user",
//     items: [
//       {
//         label: "New",
//         icon: "pi pi-fw pi-user-plus",
//       },
//       {
//         label: "Delete",
//         icon: "pi pi-fw pi-user-minus",
//       },
//       {
//         label: "Search",
//         icon: "pi pi-fw pi-users",
//         items: [
//           {
//             label: "Filter",
//             icon: "pi pi-fw pi-filter",
//             items: [
//               {
//                 label: "Print",
//                 icon: "pi pi-fw pi-print",
//               },
//             ],
//           },
//           {
//             icon: "pi pi-fw pi-bars",
//             label: "List",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Events",
//     icon: "pi pi-fw pi-calendar",
//     items: [
//       {
//         label: "Edit",
//         icon: "pi pi-fw pi-pencil",
//         items: [
//           {
//             label: "Save",
//             icon: "pi pi-fw pi-calendar-plus",
//           },
//           {
//             label: "Delete",
//             icon: "pi pi-fw pi-calendar-minus",
//           },
//         ],
//       },
//       {
//         label: "Archive",
//         icon: "pi pi-fw pi-calendar-times",
//         items: [
//           {
//             label: "Remove",
//             icon: "pi pi-fw pi-calendar-minus",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "Quit",
//     icon: "pi pi-fw pi-power-off",
//   },
// ];
