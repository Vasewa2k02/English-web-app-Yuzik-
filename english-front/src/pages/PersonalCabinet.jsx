import { useContext, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import { observer } from "mobx-react-lite";
import { getUserDictionaries } from "../api-requests/dictionary-api";
import { updateWord } from "../api-requests/word-api";
import "../styles/common.css";
import "../styles/dictionary-page.css";
import Input from "../components/Input";
import { REGEXES } from "../utils/regexes";

import * as dictionaryApi from "../api-requests/dictionary-api";
import * as wordApi from "../api-requests/word-api";
import { validateDto } from "../utils/helpers";

const PersonalCabinet = observer(() => {
  return <div className="container">personal cabinet</div>;
});

export default PersonalCabinet;
