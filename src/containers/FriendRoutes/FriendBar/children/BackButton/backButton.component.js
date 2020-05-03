import React from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { browserHistory } from "react-router";
import { ButtonWrapper } from "./backButton.style";

const BackButton = (props) => {
  const { t } = useTranslation();

  const reload = () => {
    window.location.reload(true);
  };
  
  async function goBack(event) {
    event.preventDefault();
    browserHistory.push("#/manageFriends");
    await reload();
  }

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
