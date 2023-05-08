import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Input from "../components/Input";
import { registration } from "../api-requests/user-api";
import { ROUTES } from "../utils/urls";
import { REGEXES } from "../utils/regexes";
import { Button } from "primereact/button";

import "../styles/common.css";
import "../styles/registration.css";
import { Dialog } from "primereact/dialog";

const Registration = observer(() => {
  const navigate = useNavigate();
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registrationDto, setRegistrationDto] = useState({
    email: "",
    name: "",
  });
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const changeEmailHandler = ({ id, value }) => {
    setRegistrationDto((prev) => ({ ...prev, [id]: value }));
    setIsValidEmail(REGEXES.EMAIL_REGEX.test(value));
    setIsValidCredentials(true);
  };

  const changeNameHandler = ({ id, value }) => {
    setRegistrationDto((prev) => ({ ...prev, [id]: value }));
    setIsValidName(REGEXES.NAME_REGEX.test(value));
    setIsValidCredentials(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setIsRegisterDisabled(true);

    try {
      await registration(registrationDto.email, registrationDto.name);
      setShowModal(true);
    } catch (err) {
      if (err.response.status === 409) {
        setIsValidCredentials(false);
        setIsRegisterDisabled(false);
      }
    }
  };

  return (
    <div className="all-center">
      <form>
        <h3 className="label">Регистрация</h3>
        <Input
          id="email"
          value={registrationDto.email}
          lableText="Email"
          isValidValue={isValidEmail}
          inputType="email"
          placeholder="Enter email"
          setDataHandler={changeEmailHandler}
          errorMessage="Некорректный email"
        />
        <Input
          id="name"
          value={registrationDto.name}
          lableText="Username"
          isValidValue={isValidName}
          inputType="text"
          placeholder="Enter name"
          setDataHandler={changeNameHandler}
        />
        <Button
          className="btn-primary"
          label="Зарегистрироваться"
          disabled={!isValidName || !isValidEmail || isRegisterDisabled}
          onClick={handleClick}
        />
        {!isValidCredentials && <p>Такой пользователь уже существует</p>}
      </form>
      <Dialog
        header="Ошибка"
        visible={showModal}
        style={{ width: "50vw" }}
        onHide={() => navigate(ROUTES.LOGIN_ROUTE)}
      >
        <p className="m-0">
          Ваш пароль отправлен на почту {registrationDto.email}. Для первого
          входа в аккаунт используйте его. В настройках аккаунта вы сможете
          изменить пароль.
        </p>
      </Dialog>
    </div>
  );
});

export default Registration;
