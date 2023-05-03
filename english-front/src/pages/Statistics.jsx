import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Input from "../components/Input";
import { Context } from "../index";
import { login } from "../api-requests/user-api";
import { ROUTES } from "../utils/urls";
import { REGEXES } from "../utils/regexes";

const Statistics = observer(() => {
  return <div>STATISTICS</div>;
});

export default Statistics;
