import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Input from "../components/Input";
import { Context } from "../index";
import { login } from "../api-requests/user-api";
import { ROUTES } from "../utils/urls";
import { REGEXES } from "../utils/regexes";
import { Button } from "react-bootstrap";

import "../styles/common.css";

const Login = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const [loginDto, setLoginDto] = useState({
    email: "",
    password: "",
  });
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const changeCredentialsHandler = ({ id, value }) => {
    setLoginDto((prev) => ({ ...prev, [id]: value }));
    setIsValidCredentials(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!REGEXES.EMAIL_REGEX.test(loginDto.email)) {
      setIsValidCredentials(false);
      return;
    }

    try {
      const data = await login(loginDto.email, loginDto.password);
      user.setUser(data);
      user.setRoleId(data.roleId);
      navigate(ROUTES.DICTIONARY_ROUTE);
    } catch (err) {
      console.log(err);
      setIsValidCredentials(false);
    }
  };

  return (
    <div className="all-center">
      <form>
        <h3>Авторизация</h3>
        <Input
          id="email"
          value={loginDto.email}
          lableText="Email"
          inputType="email"
          placeholder="Enter email"
          setDataHandler={changeCredentialsHandler}
          isValidValue={true}
        />
        <Input
          id="password"
          value={loginDto.password}
          lableText="User password"
          inputType="password"
          placeholder="Enter password"
          setDataHandler={changeCredentialsHandler}
          isValidValue={true}
        />
        <Button type="submit" onClick={handleClick}>
          Войти
        </Button>
        {!isValidCredentials && <p>Неверные данные</p>}
      </form>
    </div>
  );
});

export default Login;
