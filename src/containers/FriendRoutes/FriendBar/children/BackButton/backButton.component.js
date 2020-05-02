import React from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { browserHistory } from "react-router";
import { ButtonWrapper } from "./backButton.style";

const BackButton = (props) => {
  const { t } = useTranslation();

  async function goBack(event) {
    event.preventDefault();
    browserHistory.push("/viade_en2a/#/manageFriends");
    await reload();
  }

  const reload = () => {
    window.location.reload(true);
  };

  return (
    <ButtonWrapper>
      <Button
        className="backButton"
        variant="light"
        onClick={(event) => goBack(event)}
        data-testid="friend-backButton"
      >
        {t("utils.back")}
      </Button>
    </ButtonWrapper>
  );
};

export default BackButton;
